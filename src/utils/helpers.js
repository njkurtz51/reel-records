export function slugify(name) {
  return name
    .toLowerCase()
    .replace(/,\s*/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function deslugify(slug) {
  return slug
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function parseWeight(weightDisplay) {
  const match = weightDisplay.match(/(\d+\.?\d*)\s*kg/);
  if (match) {
    return {
      kg: parseFloat(match[1]),
    };
  }
  return { kg: 0 };
}

export function categorizeSpecies(record) {
  const name = record.common_name.toLowerCase();
  const categories = [];

  if (name.includes('shark') || name.includes('dogfish')) {
    categories.push('Shark');
  }

  const tropicalCountries = [
    'Brazil', 'Mexico', 'Australia', 'Thailand', 'Philippines',
    'Malaysia', 'Indonesia', 'Papua New Guinea', 'Costa Rica',
    'Panama', 'Belize', 'Colombia', 'Venezuela', 'Peru', 'Ecuador',
  ];

  const tropicalSpecies = [
    'barracuda', 'marlin', 'tuna', 'mahi', 'sailfish',
    'snapper', 'grouper', 'parrotfish', 'triggerfish',
  ];

  if (
    tropicalCountries.includes(record.country) ||
    tropicalSpecies.some(species => name.includes(species))
  ) {
    categories.push('Tropical');
  }

  const freshwaterSpecies = [
    'bass', 'trout', 'pike', 'catfish', 'carp', 'perch',
    'walleye', 'salmon', 'bluegill', 'crappie', 'muskie',
    'arapaima', 'sturgeon', 'gar', 'bowfin', 'sunfish',
  ];

  if (freshwaterSpecies.some(species => name.includes(species))) {
    categories.push('Freshwater');
  } else if (!categories.includes('Shark')) {
    categories.push('Saltwater');
  }

  return categories;
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function sortRecordsByWeight(records) {
  return [...records].sort((a, b) => b.weight_kg - a.weight_kg);
}

export function sortRecordsByDate(records, direction = 'desc') {
  return [...records].sort((a, b) => {
    const dateA = new Date(a.catch_date);
    const dateB = new Date(b.catch_date);
    return direction === 'desc' ? dateB - dateA : dateA - dateB;
  });
}

export function getTopRecords(records, count = 10) {
  return sortRecordsByWeight(records).slice(0, count);
}

export function findRecordBySlug(records, slug) {
  return records.find(record => slugify(record.common_name) === slug);
}

export function findRecordsByGenus(records, genus) {
  return records.filter(record => record.genus === genus);
}

export function getLatestRecords(records, count = 5) {
  return sortRecordsByDate(records, 'desc').slice(0, count);
}

export function getOldestRecords(records, count = 10) {
  return sortRecordsByDate(records, 'asc').slice(0, count);
}

export function getCountryCounts(records) {
  const counts = {};
  records.forEach(record => {
    counts[record.country] = (counts[record.country] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAnglerCounts(records) {
  const counts = {};
  records.forEach(record => {
    counts[record.angler] = (counts[record.angler] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([angler, count]) => ({ angler, count }))
    .sort((a, b) => b.count - a.count);
}

export function filterRecordsByCountry(records, country) {
  if (!country) return records;
  return records.filter(record => record.country === country);
}

export function filterRecordsByCategory(records, category) {
  if (!category) return records;
  return records.filter(record => {
    const categories = categorizeSpecies(record);
    return categories.includes(category);
  });
}

export function searchRecords(records, query) {
  if (!query) return records;
  const q = query.toLowerCase();
  return records.filter(record =>
    record.common_name.toLowerCase().includes(q) ||
    record.scientific_name.toLowerCase().includes(q) ||
    record.angler.toLowerCase().includes(q) ||
    record.location_full.toLowerCase().includes(q)
  );
}
