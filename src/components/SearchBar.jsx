import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../utils/helpers';
import { colors, fonts } from '../utils/colors';

export default function SearchBar({ records, onSearch, placeholder = 'Search species...', variant = 'default' }) {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const getFilteredSpecies = () => {
    if (!query) return [];
    const q = query.toLowerCase();
    const uniqueSpecies = {};

    records.forEach(record => {
      const name = record.common_name;
      if (name.toLowerCase().includes(q) && !uniqueSpecies[name]) {
        uniqueSpecies[name] = record;
      }
    });

    return Object.values(uniqueSpecies).slice(0, 8);
  };

  const filteredSpecies = getFilteredSpecies();

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !inputRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setShowDropdown(true);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleSelect = () => {
    setShowDropdown(false);
    setQuery('');
  };

  const isHero = variant === 'hero';

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setShowDropdown(true)}
          placeholder={placeholder}
          className="w-full focus:outline-none"
          style={{
            fontFamily: fonts.sans,
            fontSize: isHero ? '1.0625rem' : '0.9375rem',
            padding: isHero ? '1rem 3rem 1rem 1.25rem' : '0.75rem 2.5rem 0.75rem 1rem',
            borderRadius: '8px',
            border: isHero ? 'none' : `1px solid ${colors.gray300}`,
            backgroundColor: isHero ? 'rgba(255,255,255,0.95)' : colors.white,
            color: colors.gray800,
            boxShadow: isHero ? '0 4px 24px rgba(0,0,0,0.15)' : 'none',
          }}
        />
        <span
          className="absolute top-1/2 -translate-y-1/2"
          style={{
            right: isHero ? '1.25rem' : '1rem',
            color: colors.gray400,
            fontSize: isHero ? '1.125rem' : '1rem',
            pointerEvents: 'none',
          }}
        >
          &#x2315;
        </span>
      </div>

      {showDropdown && filteredSpecies.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 z-40 overflow-hidden"
          style={{
            backgroundColor: colors.white,
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            border: `1px solid ${colors.gray200}`,
          }}
        >
          {filteredSpecies.map((record, idx) => (
            <Link
              key={record.id}
              to={`/species/${slugify(record.common_name)}`}
              onClick={handleSelect}
              className="block px-4 py-3 transition-colors"
              style={{
                textDecoration: 'none',
                color: colors.navy,
                borderBottom: idx < filteredSpecies.length - 1 ? `1px solid ${colors.gray100}` : 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = colors.cream)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: '0.9375rem' }}>
                {record.common_name}
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: '0.8125rem', color: colors.gray600, fontStyle: 'italic' }}>
                {record.scientific_name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
