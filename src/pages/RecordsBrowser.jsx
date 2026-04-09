import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecordCard from '../components/RecordCard';
import { colors, fonts } from '../utils/colors';
import {
  searchRecords,
  filterRecordsByCountry,
  filterRecordsByCategory,
} from '../utils/helpers';

export default function RecordsBrowser({ records, countries }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(
    searchParams.get('country') || ''
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || ''
  );
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'name');
  const [viewType, setViewType] = useState('grid');
  const [itemsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ['Freshwater', 'Saltwater', 'Shark', 'Tropical'];

  const filtered = useMemo(() => {
    let result = [...records];
    if (searchQuery) result = searchRecords(result, searchQuery);
    if (selectedCountry) result = filterRecordsByCountry(result, selectedCountry);
    if (selectedCategory) result = filterRecordsByCategory(result, selectedCategory);

    if (sortBy === 'weight') {
      result.sort((a, b) => b.weight_kg - a.weight_kg);
    } else if (sortBy === 'date') {
      result.sort((a, b) => new Date(b.catch_date) - new Date(a.catch_date));
    } else {
      result.sort((a, b) => a.common_name.localeCompare(b.common_name));
    }
    return result;
  }, [records, searchQuery, selectedCountry, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedRecords = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (query) => { setSearchQuery(query); setCurrentPage(1); };

  const handleCountryChange = (e) => {
    const value = e.target.value;
    setSelectedCountry(value);
    setCurrentPage(1);
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      value ? p.set('country', value) : p.delete('country');
      return p;
    });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setCurrentPage(1);
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      value ? p.set('category', value) : p.delete('category');
      return p;
    });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      p.set('sort', e.target.value);
      return p;
    });
  };

  const clearFilters = () => {
    setSearchQuery(''); setSelectedCountry(''); setSelectedCategory('');
    setSortBy('name'); setCurrentPage(1); setSearchParams({});
  };

  const selectStyle = {
    fontFamily: fonts.sans,
    fontSize: '0.875rem',
    padding: '0.625rem 1rem',
    borderRadius: '6px',
    border: `1px solid ${colors.gray300}`,
    backgroundColor: colors.white,
    color: colors.gray700,
    outline: 'none',
    width: '100%',
  };

  const viewBtnStyle = (active) => ({
    fontFamily: fonts.sans,
    fontSize: '0.8125rem',
    fontWeight: 600,
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: active ? 'none' : `1px solid ${colors.gray300}`,
    backgroundColor: active ? colors.navy : colors.white,
    color: active ? colors.white : colors.gray700,
    cursor: 'pointer',
  });

  return (
    <div style={{ backgroundColor: colors.cream, minHeight: '100vh', paddingTop: '5rem', paddingBottom: '4rem' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <div className="label-caps mb-3" style={{ color: colors.gold }}>Database</div>
          <h1
            style={{
              fontFamily: fonts.serif,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: colors.navyDark,
              marginBottom: '0.5rem',
            }}
          >
            Explore Records
          </h1>
          <p style={{ fontFamily: fonts.sans, fontSize: '1rem', color: colors.gray600 }}>
            Browse and filter {records.length.toLocaleString()} world fishing records
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <SearchBar records={records} onSearch={handleSearch} placeholder="Search species, angler, location..." />
        </div>

        {/* Filters */}
        <div
          className="rounded-lg p-5 mb-6"
          style={{ backgroundColor: colors.white, border: `1px solid ${colors.gray200}` }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Quick search..."
              style={selectStyle}
            />
            <select value={selectedCountry} onChange={handleCountryChange} style={selectStyle}>
              <option value="">All Countries</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={selectedCategory} onChange={handleCategoryChange} style={selectStyle}>
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={sortBy} onChange={handleSortChange} style={selectStyle}>
              <option value="name">Sort by Name</option>
              <option value="weight">Sort by Weight</option>
              <option value="date">Sort by Date</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={clearFilters}
              className="border-none cursor-pointer bg-transparent"
              style={{ fontFamily: fonts.sans, fontSize: '0.8125rem', fontWeight: 600, color: colors.gold }}
              onMouseEnter={e => (e.target.style.color = colors.goldDark)}
              onMouseLeave={e => (e.target.style.color = colors.gold)}
            >
              Clear Filters
            </button>
            <div className="flex gap-2">
              <button onClick={() => setViewType('grid')} style={viewBtnStyle(viewType === 'grid')}>Grid</button>
              <button onClick={() => setViewType('table')} style={viewBtnStyle(viewType === 'table')}>Table</button>
            </div>
          </div>
        </div>

        {/* Count */}
        <div className="mb-6">
          <p style={{ fontFamily: fonts.sans, fontSize: '0.8125rem', color: colors.gray600 }}>
            Showing {(currentPage - 1) * itemsPerPage + 1}&ndash;{Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} records
          </p>
        </div>

        {/* Grid View */}
        {viewType === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {paginatedRecords.map(record => (
              <RecordCard key={record.id} record={record} />
            ))}
          </div>
        )}

        {/* Table View */}
        {viewType === 'table' && (
          <div className="overflow-x-auto mb-12" style={{ borderRadius: '6px', border: `1px solid ${colors.gray200}`, overflow: 'hidden' }}>
            <table className="w-full text-left" style={{ fontFamily: fonts.sans, fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: colors.navy }}>
                  {['Species', 'Weight (kg)', 'Angler', 'Location', 'Date'].map(h => (
                    <th key={h} className="px-5 py-3" style={{ color: colors.white, fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedRecords.map((record, idx) => (
                  <tr
                    key={record.id}
                    style={{
                      backgroundColor: idx % 2 === 0 ? colors.white : colors.gray50,
                      borderBottom: `1px solid ${colors.gray200}`,
                      transition: 'background-color 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = colors.cream)}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = idx % 2 === 0 ? colors.white : colors.gray50)}
                  >
                    <td className="px-5 py-3" style={{ fontWeight: 600, color: colors.navy }}>{record.common_name}</td>
                    <td className="px-5 py-3" style={{ fontWeight: 700, color: colors.gold, fontFamily: fonts.serif, fontSize: '1rem' }}>{record.weight_kg}</td>
                    <td className="px-5 py-3" style={{ color: colors.gray700 }}>{record.angler}</td>
                    <td className="px-5 py-3" style={{ color: colors.gray600, fontSize: '0.8125rem' }}>{record.location_full}</td>
                    <td className="px-5 py-3" style={{ color: colors.gray600, fontSize: '0.8125rem' }}>{record.catch_date_display}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {paginatedRecords.length === 0 && (
          <div className="text-center py-16">
            <p style={{ fontFamily: fonts.sans, fontSize: '1rem', color: colors.gray600 }}>No records found matching your filters.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              style={{
                fontFamily: fonts.sans, fontSize: '0.8125rem', fontWeight: 600,
                padding: '0.5rem 1rem', borderRadius: '6px',
                border: `1px solid ${colors.gray300}`, backgroundColor: colors.white, color: colors.gray700,
              }}
            >
              Prev
            </button>

            <span style={{ fontFamily: fonts.sans, fontSize: '0.8125rem', color: colors.gray600, padding: '0 0.5rem' }}>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              style={{
                fontFamily: fonts.sans, fontSize: '0.8125rem', fontWeight: 600,
                padding: '0.5rem 1rem', borderRadius: '6px',
                border: `1px solid ${colors.gray300}`, backgroundColor: colors.white, color: colors.gray700,
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
