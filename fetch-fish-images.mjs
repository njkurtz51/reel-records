#!/usr/bin/env node
/**
 * Reel Records — Fish Image Fetcher
 * Pulls species photos from iNaturalist API using scientific names.
 * Run: node fetch-fish-images.mjs
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, 'src', 'data', 'world_records.json');
const IMG_DIR = path.join(__dirname, 'public', 'fish-images');
const MANIFEST_PATH = path.join(__dirname, 'src', 'data', 'image_manifest.json');
const MISSING_PATH = path.join(__dirname, 'missing_species.txt');

// Rate limit: be kind to iNaturalist (1 request per 1.2 seconds)
const DELAY_MS = 1200;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'ReelRecords/1.0 (fishing world records site)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse error: ${e.message}`)); }
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, { headers: { 'User-Agent': 'ReelRecords/1.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        downloadFile(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    });
    req.on('error', (e) => { file.close(); try { fs.unlinkSync(dest); } catch {} reject(e); });
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('download timeout')); });
  });
}

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function main() {
  console.log('\n  🐟 Reel Records — Fish Image Fetcher\n');

  // Load records
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  const records = data.records;
  console.log(`  Found ${records.length} species to fetch images for.\n`);

  // Create image directory
  if (!fs.existsSync(IMG_DIR)) {
    fs.mkdirSync(IMG_DIR, { recursive: true });
  }

  // Check for existing progress
  let manifest = {};
  if (fs.existsSync(MANIFEST_PATH)) {
    manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    const existingCount = Object.keys(manifest).filter(k => manifest[k].hasImage).length;
    console.log(`  Resuming — ${existingCount} images already downloaded.\n`);
  }

  let found = 0;
  let notFound = 0;
  let errors = 0;
  let skipped = 0;
  const missing = [];

  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    const slug = slugify(record.common_name);
    const sciName = record.scientific_name;

    // Skip if already processed
    if (manifest[slug] && manifest[slug].hasImage) {
      skipped++;
      continue;
    }
    if (manifest[slug] && manifest[slug].checked) {
      // Already checked, no image found last time
      notFound++;
      missing.push(`${record.common_name} | ${sciName}`);
      continue;
    }

    process.stdout.write(`  [${i + 1}/${records.length}] ${record.common_name}... `);

    try {
      // Search iNaturalist by scientific name
      const searchUrl = `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(sciName)}&rank=species&per_page=3`;
      const result = await fetchJSON(searchUrl);

      let photo = null;
      let attribution = null;

      if (result.results && result.results.length > 0) {
        // Find best match — prefer exact scientific name match
        const exactMatch = result.results.find(t =>
          t.name && t.name.toLowerCase() === sciName.toLowerCase()
        );
        const taxon = exactMatch || result.results[0];

        if (taxon.default_photo && taxon.default_photo.medium_url) {
          photo = taxon.default_photo.medium_url;
          attribution = taxon.default_photo.attribution || 'iNaturalist';
        }
      }

      if (photo) {
        // Download the image
        const ext = photo.includes('.png') ? '.png' : '.jpg';
        const filename = `${slug}${ext}`;
        const filepath = path.join(IMG_DIR, filename);

        await downloadFile(photo, filepath);

        manifest[slug] = {
          hasImage: true,
          filename,
          attribution,
          source: 'inaturalist',
          checked: true,
        };
        found++;
        console.log('✓ found');
      } else {
        manifest[slug] = { hasImage: false, checked: true };
        notFound++;
        missing.push(`${record.common_name} | ${sciName}`);
        console.log('✗ no photo');
      }
    } catch (e) {
      manifest[slug] = { hasImage: false, checked: true };
      errors++;
      missing.push(`${record.common_name} | ${sciName}`);
      console.log(`✗ error: ${e.message}`);
    }

    // Save progress every 25 species
    if ((i + 1) % 25 === 0) {
      fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
    }

    await sleep(DELAY_MS);
  }

  // Final save
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  // Write missing species list
  if (missing.length > 0) {
    fs.writeFileSync(MISSING_PATH, missing.join('\n') + '\n');
  }

  const totalWithImages = Object.keys(manifest).filter(k => manifest[k].hasImage).length;

  console.log('\n  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  ✓ Images found:     ${found} (new) + ${skipped} (existing) = ${totalWithImages} total`);
  console.log(`  ✗ No image:         ${notFound}`);
  console.log(`  ! Errors:           ${errors}`);
  console.log(`  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  console.log(`  Images saved to:    ${IMG_DIR}`);
  console.log(`  Manifest saved to:  ${MANIFEST_PATH}`);
  if (missing.length > 0) {
    console.log(`  Missing list:       ${MISSING_PATH}`);
    console.log(`\n  Use missing_species.txt to generate the remaining images with AI.\n`);
  }
}

main().catch(e => { console.error('Fatal error:', e); process.exit(1); });
