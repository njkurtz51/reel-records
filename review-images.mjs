#!/usr/bin/env node
/**
 * Generates an HTML review page to visually check all downloaded fish images.
 * Run: node review-images.mjs
 * Then open: review-images.html in your browser
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, 'src', 'data', 'world_records.json');
const IMG_DIR = path.join(__dirname, 'public', 'fish-images');
const MANIFEST_PATH = path.join(__dirname, 'src', 'data', 'image_manifest.json');
const OUTPUT_PATH = path.join(__dirname, 'review-images.html');

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const records = data.records;

// Check what images actually exist on disk
const existingFiles = new Set(fs.existsSync(IMG_DIR) ? fs.readdirSync(IMG_DIR) : []);

// Load manifest if it exists
let manifest = {};
if (fs.existsSync(MANIFEST_PATH)) {
  manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
}

const withImages = [];
const withoutImages = [];

for (const record of records) {
  const slug = slugify(record.common_name);
  const jpgExists = existingFiles.has(`${slug}.jpg`);
  const pngExists = existingFiles.has(`${slug}.png`);
  const hasImage = jpgExists || pngExists;
  const filename = jpgExists ? `${slug}.jpg` : pngExists ? `${slug}.png` : null;
  const attribution = manifest[slug]?.attribution || '';

  if (hasImage) {
    withImages.push({ ...record, slug, filename, attribution });
  } else {
    withoutImages.push({ ...record, slug });
  }
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reel Records — Image Review</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, system-ui, sans-serif; background: #faf7f2; color: #333; padding: 2rem; }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; color: #071425; }
    .subtitle { color: #666; margin-bottom: 2rem; font-size: 1rem; }
    .stats { display: flex; gap: 2rem; margin-bottom: 2rem; padding: 1rem 1.5rem; background: #fff; border-radius: 8px; border: 1px solid #e5e2dc; }
    .stat-num { font-size: 1.5rem; font-weight: 700; color: #071425; }
    .stat-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #888; }
    .tabs { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
    .tab { padding: 0.5rem 1.25rem; border-radius: 6px; border: 1px solid #d1cdc6; background: #fff; cursor: pointer; font-size: 0.875rem; font-weight: 600; }
    .tab.active { background: #071425; color: #fff; border-color: #071425; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
    .card { background: #fff; border-radius: 6px; border: 1px solid #e5e2dc; overflow: hidden; transition: box-shadow 0.2s; }
    .card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
    .card img { width: 100%; height: 160px; object-fit: cover; display: block; }
    .card .info { padding: 0.75rem; }
    .card .name { font-weight: 700; font-size: 0.875rem; color: #071425; margin-bottom: 2px; }
    .card .sci { font-size: 0.75rem; color: #999; font-style: italic; }
    .card .attr { font-size: 0.625rem; color: #aaa; margin-top: 4px; }
    .card.flagged { border-color: #e74c3c; border-width: 3px; }
    .card .flag-btn { display: block; width: 100%; padding: 0.4rem; border: none; background: #f8f8f8; color: #888; font-size: 0.75rem; cursor: pointer; border-top: 1px solid #eee; }
    .card .flag-btn:hover { background: #fee; color: #e74c3c; }
    .card.flagged .flag-btn { background: #fee; color: #e74c3c; font-weight: 700; }
    .missing-card { background: #fff; border-radius: 6px; border: 1px solid #e5e2dc; padding: 0.75rem; }
    .missing-card .name { font-weight: 600; font-size: 0.875rem; color: #071425; }
    .missing-card .sci { font-size: 0.75rem; color: #999; font-style: italic; }
    .export-btn { padding: 0.75rem 1.5rem; background: #c9956b; color: #071425; border: none; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 0.875rem; margin-top: 1rem; }
    .export-btn:hover { background: #b8845a; }
    #missing-section, #flagged-section { display: none; }
    .search { width: 100%; max-width: 400px; padding: 0.625rem 1rem; border-radius: 6px; border: 1px solid #d1cdc6; font-size: 0.875rem; margin-bottom: 1.5rem; }
  </style>
</head>
<body>
  <h1>Image Review</h1>
  <p class="subtitle">Click "Flag Wrong" on any image that doesn't match the species. Export your flags when done.</p>

  <div class="stats">
    <div><div class="stat-num">${withImages.length}</div><div class="stat-label">With Images</div></div>
    <div><div class="stat-num">${withoutImages.length}</div><div class="stat-label">Missing Images</div></div>
    <div><div class="stat-num">${records.length}</div><div class="stat-label">Total Species</div></div>
    <div><div class="stat-num" id="flag-count">0</div><div class="stat-label">Flagged Wrong</div></div>
  </div>

  <input type="text" class="search" placeholder="Search species..." oninput="filterCards(this.value)">

  <div class="tabs">
    <button class="tab active" onclick="showTab('images')">With Images (${withImages.length})</button>
    <button class="tab" onclick="showTab('missing')">Missing (${withoutImages.length})</button>
    <button class="tab" onclick="showTab('flagged')">Flagged</button>
  </div>

  <div id="images-section">
    <div class="grid" id="image-grid">
      ${withImages.map(r => `
        <div class="card" data-slug="${r.slug}" data-name="${r.common_name.toLowerCase()}">
          <img src="fish-images/${r.filename}" alt="${r.common_name}" loading="lazy">
          <div class="info">
            <div class="name">${r.common_name}</div>
            <div class="sci">${r.scientific_name}</div>
            ${r.attribution ? `<div class="attr">${r.attribution}</div>` : ''}
          </div>
          <button class="flag-btn" onclick="toggleFlag(this)">Flag Wrong</button>
        </div>
      `).join('')}
    </div>
  </div>

  <div id="missing-section">
    <div class="grid">
      ${withoutImages.map(r => `
        <div class="missing-card" data-name="${r.common_name.toLowerCase()}">
          <div class="name">${r.common_name}</div>
          <div class="sci">${r.scientific_name}</div>
        </div>
      `).join('')}
    </div>
  </div>

  <div id="flagged-section">
    <div class="grid" id="flagged-grid"></div>
    <button class="export-btn" onclick="exportFlags()">Export Flagged List</button>
  </div>

  <script>
    const flagged = new Set();

    function toggleFlag(btn) {
      const card = btn.closest('.card');
      const slug = card.dataset.slug;
      if (flagged.has(slug)) {
        flagged.delete(slug);
        card.classList.remove('flagged');
        btn.textContent = 'Flag Wrong';
      } else {
        flagged.add(slug);
        card.classList.add('flagged');
        btn.textContent = 'Flagged!';
      }
      document.getElementById('flag-count').textContent = flagged.size;
    }

    function showTab(tab) {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      event.target.classList.add('active');
      document.getElementById('images-section').style.display = tab === 'images' ? 'block' : 'none';
      document.getElementById('missing-section').style.display = tab === 'missing' ? 'block' : 'none';
      document.getElementById('flagged-section').style.display = tab === 'flagged' ? 'block' : 'none';

      if (tab === 'flagged') {
        const grid = document.getElementById('flagged-grid');
        const cards = document.querySelectorAll('.card.flagged');
        grid.innerHTML = '';
        cards.forEach(c => grid.appendChild(c.cloneNode(true)));
      }
    }

    function filterCards(query) {
      const q = query.toLowerCase();
      document.querySelectorAll('[data-name]').forEach(card => {
        card.style.display = card.dataset.name.includes(q) ? '' : 'none';
      });
    }

    function exportFlags() {
      const names = [];
      document.querySelectorAll('.card.flagged').forEach(card => {
        const name = card.querySelector('.name').textContent;
        const sci = card.querySelector('.sci').textContent;
        names.push(name + ' | ' + sci);
      });
      const text = 'FLAGGED AS WRONG IMAGE:\\n\\n' + names.join('\\n');
      const blob = new Blob([text], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'flagged_wrong_images.txt';
      a.click();
    }
  </script>
</body>
</html>`;

fs.writeFileSync(OUTPUT_PATH, html);

console.log(`\n  Image Review Page Generated!`);
console.log(`  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`  With images:    ${withImages.length}`);
console.log(`  Missing images: ${withoutImages.length}`);
console.log(`  Total species:  ${records.length}`);
console.log(`\n  Open this file in your browser:`);
console.log(`  ${OUTPUT_PATH}\n`);
