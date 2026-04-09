import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecordCard from '../components/RecordCard';
import { colors, gradients, fonts } from '../utils/colors';
import {
  getTopRecords,
  getLatestRecords,
  formatDate,
} from '../utils/helpers';

export default function HomePage({ records }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const topHeaviest = getTopRecords(records, 9);
  const latest = getLatestRecords(records, 6);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const navigateToCategory = (category) => {
    navigate(`/records?category=${category}`);
  };

  const categories = [
    {
      name: 'Freshwater',
      slug: 'Freshwater',
      subtitle: 'Rivers, lakes & streams',
      bg: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)',
    },
    {
      name: 'Saltwater',
      slug: 'Saltwater',
      subtitle: 'Open ocean giants',
      bg: 'linear-gradient(135deg, #0B1D3A 0%, #1a3a52 100%)',
    },
    {
      name: 'Sharks & Rays',
      slug: 'Shark',
      subtitle: 'Apex predators',
      bg: 'linear-gradient(135deg, #292524 0%, #44403c 100%)',
    },
    {
      name: 'Tropical',
      slug: 'Tropical',
      subtitle: 'Warm water species',
      bg: 'linear-gradient(135deg, #c87941 0%, #a0734d 100%)',
    },
    {
      name: 'Recent Records',
      slug: 'recent',
      subtitle: 'Newly broken',
      bg: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldDark} 100%)`,
    },
  ];

  return (
    <div style={{ backgroundColor: colors.cream }}>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          background: gradients.heroOverlay,
          paddingTop: '10rem',
          paddingBottom: '6rem',
        }}
      >
        {/* Subtle wave pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z' fill='%23ffffff'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat-x',
            backgroundSize: '100% 80px',
            backgroundPosition: 'bottom',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* Eyebrow label */}
          <div
            className="mb-6"
            style={{
              fontFamily: fonts.sans,
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: colors.gold,
            }}
          >
            The World&rsquo;s Fishing Records
          </div>

          <h1
            style={{
              fontFamily: fonts.serif,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 900,
              color: colors.white,
              lineHeight: 1.05,
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em',
            }}
          >
            Every Species.<br />Every Record.
          </h1>

          <p
            style={{
              fontFamily: fonts.sans,
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              fontWeight: 300,
              color: colors.goldLight,
              maxWidth: '560px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.6,
            }}
          >
            Explore {records.length.toLocaleString()} IGFA All-Tackle world records spanning {new Set(records.map(r => r.country)).size} countries and over nine decades of fishing history.
          </p>

          <div className="flex justify-center mb-16">
            <SearchBar
              records={records}
              onSearch={handleSearch}
              placeholder="Search any species..."
              variant="hero"
            />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto">
            {[
              { num: records.length.toLocaleString(), label: 'SPECIES' },
              { num: String(new Set(records.map(r => r.country)).size), label: 'COUNTRIES' },
              { num: records.reduce((min, r) => { const y = new Date(r.catch_date).getFullYear(); return y < min ? y : min; }, 9999).toString(), label: 'EARLIEST RECORD' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div
                  style={{
                    fontFamily: fonts.serif,
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    fontWeight: 700,
                    color: colors.white,
                    lineHeight: 1,
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    color: 'rgba(255,255,255,0.4)',
                    marginTop: '6px',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top 10 Heaviest */}
      <section className="section-padding" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="label-caps mb-3" style={{ color: colors.gold }}>Leaderboard</div>
            <h2
              style={{
                fontFamily: fonts.serif,
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 700,
                color: colors.navyDark,
                marginBottom: '0.5rem',
              }}
            >
              Heaviest Catches of All Time
            </h2>
            <p style={{ fontFamily: fonts.sans, fontSize: '1rem', color: colors.gray600, maxWidth: '600px' }}>
              The most legendary records in fishing history, ranked by weight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topHeaviest.map((record, index) => (
              <RecordCard key={record.id} record={record} showRank={true} rank={index + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="section-padding" style={{ backgroundColor: colors.white }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="label-caps mb-3" style={{ color: colors.gold }}>Categories</div>
            <h2
              style={{
                fontFamily: fonts.serif,
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 700,
                color: colors.navyDark,
              }}
            >
              Browse by Type
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map(category => (
              <button
                key={category.slug}
                onClick={() => navigateToCategory(category.slug)}
                className="text-white text-center transition-all duration-300 cursor-pointer border-none"
                style={{
                  background: category.bg,
                  borderRadius: '6px',
                  padding: '2rem 1rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.serif,
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    marginBottom: '4px',
                  }}
                >
                  {category.name}
                </div>
                <div
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: '0.6875rem',
                    opacity: 0.7,
                    fontWeight: 400,
                  }}
                >
                  {category.subtitle}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Records */}
      <section className="section-padding" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="label-caps mb-3" style={{ color: colors.gold }}>Recently Added</div>
              <h2
                style={{
                  fontFamily: fonts.serif,
                  fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                  fontWeight: 700,
                  color: colors.navyDark,
                }}
              >
                Latest Records
              </h2>
            </div>
            <button
              onClick={() => navigate('/records?sort=date')}
              className="hidden md:inline-block border-none cursor-pointer bg-transparent"
              style={{
                fontFamily: fonts.sans,
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: colors.gold,
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => (e.target.style.color = colors.goldDark)}
              onMouseLeave={e => (e.target.style.color = colors.gold)}
            >
              View all &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {latest.map(record => (
              <RecordCard key={record.id} record={record} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative"
        style={{
          background: gradients.navyForest,
          padding: '5rem 1.5rem',
        }}
      >
        <div className="relative max-w-3xl mx-auto text-center">
          <h2
            style={{
              fontFamily: fonts.serif,
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 700,
              color: colors.white,
              marginBottom: '1rem',
            }}
          >
            Ready to Explore?
          </h2>
          <p
            style={{
              fontFamily: fonts.sans,
              fontSize: '1.0625rem',
              color: colors.goldLight,
              marginBottom: '2.5rem',
              fontWeight: 300,
            }}
          >
            Dive into our complete database of {records.length.toLocaleString()} world records.
          </p>
          <button
            onClick={() => navigate('/records')}
            className="transition-all duration-200 border-none cursor-pointer"
            style={{
              fontFamily: fonts.sans,
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '0.875rem 2.5rem',
              borderRadius: '6px',
              backgroundColor: colors.gold,
              color: colors.navyDark,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = colors.goldLight;
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = colors.gold;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Explore All Records
          </button>
        </div>
      </section>
    </div>
  );
}
