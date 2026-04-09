import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecordCard from '../components/RecordCard';
import { colors, gradients, fonts } from '../utils/colors';
import {
  getTopRecords,
  getLatestRecords,
  getCountryCounts,
  formatDate,
  slugify,
} from '../utils/helpers';

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if already in viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function FadeInSection({ children, delay = 0, className = '' }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function HomePage({ records }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const topHeaviest = getTopRecords(records, 9);
  const latest = getLatestRecords(records, 6);
  const topCountries = getCountryCounts(records).slice(0, 6);

  const handleSearch = (query) => setSearchQuery(query);

  const navigateToCategory = (category) => {
    navigate(`/records?category=${category}`);
  };

  const categories = [
    {
      name: 'Freshwater',
      slug: 'Freshwater',
      subtitle: 'Rivers, lakes & streams',
      icon: '🏞️',
      bg: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)',
    },
    {
      name: 'Saltwater',
      slug: 'Saltwater',
      subtitle: 'Open ocean giants',
      icon: '🌊',
      bg: 'linear-gradient(135deg, #0B1D3A 0%, #1a3a52 100%)',
    },
    {
      name: 'Sharks & Rays',
      slug: 'Shark',
      subtitle: 'Apex predators',
      icon: '🦈',
      bg: 'linear-gradient(135deg, #292524 0%, #44403c 100%)',
    },
    {
      name: 'Tropical',
      slug: 'Tropical',
      subtitle: 'Warm water species',
      icon: '☀️',
      bg: 'linear-gradient(135deg, #7f4f24 0%, #c87941 100%)',
    },
  ];

  const countryCount = new Set(records.map(r => r.country)).size;
  const earliestYear = records.reduce((min, r) => {
    const y = new Date(r.catch_date).getFullYear();
    return y < min ? y : min;
  }, 9999);

  return (
    <div style={{ backgroundColor: colors.cream }}>
      {/* ═══════════════════════ HERO SECTION ═══════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(170deg, rgba(7,20,37,0.97) 0%, rgba(11,29,58,0.95) 35%, rgba(27,67,50,0.92) 100%)`,
          paddingTop: '9rem',
          paddingBottom: '5rem',
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(201,149,107,0.06) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, rgba(27,67,50,0.15) 0%, transparent 50%)`,
          }}
        />

        {/* Decorative grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* Eyebrow */}
          <FadeInSection>
            <div
              className="inline-flex items-center gap-2 mb-6"
              style={{
                fontFamily: fonts.sans,
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: colors.gold,
                border: `1px solid rgba(201,149,107,0.25)`,
                padding: '6px 16px',
                borderRadius: '20px',
                backgroundColor: 'rgba(201,149,107,0.06)',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: colors.gold, display: 'inline-block' }} />
              The World's Fishing Records
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h1
              style={{
                fontFamily: fonts.serif,
                fontSize: 'clamp(2.75rem, 7vw, 5rem)',
                fontWeight: 900,
                color: colors.white,
                lineHeight: 1.05,
                marginBottom: '1.5rem',
                letterSpacing: '-0.025em',
              }}
            >
              Every Species.
              <br />
              <span style={{ color: colors.goldLight }}>Every Record.</span>
            </h1>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <p
              style={{
                fontFamily: fonts.sans,
                fontSize: 'clamp(1rem, 2vw, 1.1875rem)',
                fontWeight: 300,
                color: 'rgba(224,196,168,0.8)',
                maxWidth: '540px',
                margin: '0 auto 2.5rem',
                lineHeight: 1.7,
              }}
            >
              Explore {records.length.toLocaleString()} IGFA All-Tackle world records
              spanning {countryCount} countries and over nine decades of fishing history.
            </p>
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <div className="flex justify-center mb-20">
              <SearchBar
                records={records}
                onSearch={handleSearch}
                placeholder="Search any species..."
                variant="hero"
              />
            </div>
          </FadeInSection>

          {/* Stats row */}
          <FadeInSection delay={0.4}>
            <div
              className="grid grid-cols-3 gap-8 max-w-lg mx-auto"
              style={{
                borderTop: '1px solid rgba(201,149,107,0.15)',
                paddingTop: '2rem',
              }}
            >
              {[
                { num: records.length.toLocaleString(), label: 'Species Recorded' },
                { num: String(countryCount), label: 'Countries' },
                { num: String(earliestYear), label: 'Earliest Record' },
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
                      fontSize: '0.5625rem',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.35)',
                      marginTop: '8px',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>

        {/* Hero bottom wave divider */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '80px',
            background: `linear-gradient(to bottom, transparent, ${colors.cream})`,
          }}
        />
      </section>

      {/* ═══════════════════════ TOP HEAVIEST ═══════════════════════ */}
      <section style={{ backgroundColor: colors.cream, padding: '4rem 1.5rem 5rem' }}>
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
              <div>
                <div className="label-caps mb-2" style={{ color: colors.gold }}>Leaderboard</div>
                <h2
                  style={{
                    fontFamily: fonts.serif,
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    fontWeight: 700,
                    color: colors.navyDark,
                    marginBottom: '0.5rem',
                  }}
                >
                  Heaviest Catches of All Time
                </h2>
                <div className="section-divider" />
              </div>
              <button
                onClick={() => navigate('/leaderboards')}
                className="hidden md:inline-block border-none cursor-pointer bg-transparent mt-4 md:mt-0"
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
                View full leaderboard →
              </button>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topHeaviest.map((record, index) => (
              <FadeInSection key={record.id} delay={index * 0.05}>
                <RecordCard record={record} showRank={true} rank={index + 1} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ BROWSE BY CATEGORY ═══════════════════════ */}
      <section
        style={{
          backgroundColor: colors.white,
          padding: '5rem 1.5rem',
          borderTop: `1px solid ${colors.gray200}`,
          borderBottom: `1px solid ${colors.gray200}`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <div className="label-caps mb-2" style={{ color: colors.gold }}>Categories</div>
              <h2
                style={{
                  fontFamily: fonts.serif,
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 700,
                  color: colors.navyDark,
                  marginBottom: '0.5rem',
                }}
              >
                Browse by Type
              </h2>
              <div className="section-divider" style={{ margin: '0.75rem auto 0' }} />
            </div>
          </FadeInSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((category, idx) => (
              <FadeInSection key={category.slug} delay={idx * 0.08}>
                <button
                  onClick={() => navigateToCategory(category.slug)}
                  className="w-full text-white text-center cursor-pointer border-none card-hover"
                  style={{
                    background: category.bg,
                    borderRadius: '10px',
                    padding: '2.5rem 1.25rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Subtle pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: `radial-gradient(circle at 70% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
                    }}
                  />
                  <div className="relative">
                    <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
                      {category.icon}
                    </div>
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
                        opacity: 0.65,
                        fontWeight: 400,
                      }}
                    >
                      {category.subtitle}
                    </div>
                  </div>
                </button>
              </FadeInSection>
            ))}
          </div>

          {/* Quick view all link */}
          <FadeInSection delay={0.3}>
            <div className="text-center mt-8">
              <button
                onClick={() => navigate('/records')}
                className="border-none cursor-pointer bg-transparent"
                style={{
                  fontFamily: fonts.sans,
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: colors.gold,
                }}
                onMouseEnter={e => (e.target.style.color = colors.goldDark)}
                onMouseLeave={e => (e.target.style.color = colors.gold)}
              >
                View all {records.length.toLocaleString()} records →
              </button>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ═══════════════════════ COUNTRIES STRIP ═══════════════════════ */}
      <section
        style={{
          background: gradients.navyForest,
          padding: '3.5rem 1.5rem',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-8">
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontSize: '0.625rem',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: colors.gold,
                  marginBottom: '0.5rem',
                }}
              >
                Global Coverage
              </div>
              <h3
                style={{
                  fontFamily: fonts.serif,
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: colors.white,
                }}
              >
                Top Record-Holding Nations
              </h3>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {topCountries.map((c, i) => (
              <FadeInSection key={c.country} delay={i * 0.05}>
                <div
                  className="text-center"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                    padding: '1.25rem 0.75rem',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: fonts.serif,
                      fontSize: '1.75rem',
                      fontWeight: 700,
                      color: colors.white,
                      lineHeight: 1,
                    }}
                  >
                    {c.count}
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.sans,
                      fontSize: '0.6875rem',
                      color: 'rgba(255,255,255,0.5)',
                      marginTop: '6px',
                      fontWeight: 500,
                    }}
                  >
                    {c.country}
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ LATEST RECORDS ═══════════════════════ */}
      <section style={{ backgroundColor: colors.cream, padding: '5rem 1.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
              <div>
                <div className="label-caps mb-2" style={{ color: colors.gold }}>Recently Added</div>
                <h2
                  style={{
                    fontFamily: fonts.serif,
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    fontWeight: 700,
                    color: colors.navyDark,
                    marginBottom: '0.5rem',
                  }}
                >
                  Latest Records
                </h2>
                <div className="section-divider" />
              </div>
              <button
                onClick={() => navigate('/records?sort=date')}
                className="hidden md:inline-block border-none cursor-pointer bg-transparent mt-4 md:mt-0"
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
                View all →
              </button>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map((record, idx) => (
              <FadeInSection key={record.id} delay={idx * 0.05}>
                <RecordCard record={record} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA SECTION ═══════════════════════ */}
      <section
        className="relative"
        style={{
          background: `linear-gradient(135deg, ${colors.navyDark} 0%, ${colors.navy} 40%, ${colors.forest} 100%)`,
          padding: '6rem 1.5rem',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute"
          style={{
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            border: '1px solid rgba(201,149,107,0.06)',
            top: '-200px',
            right: '-100px',
          }}
        />
        <div
          className="absolute"
          style={{
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            border: '1px solid rgba(201,149,107,0.04)',
            bottom: '-150px',
            left: '-50px',
          }}
        />

        <div className="relative max-w-3xl mx-auto text-center">
          <FadeInSection>
            <div
              className="label-caps mb-4"
              style={{ color: colors.gold }}
            >
              Dive Deeper
            </div>
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
                color: 'rgba(224,196,168,0.7)',
                marginBottom: '2.5rem',
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              Dive into our complete database of {records.length.toLocaleString()} world records.
              Filter by species, country, or category.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/records')}
                className="transition-all duration-200 border-none cursor-pointer"
                style={{
                  fontFamily: fonts.sans,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '0.9375rem 2.5rem',
                  borderRadius: '8px',
                  backgroundColor: colors.gold,
                  color: colors.navyDark,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = colors.goldLight;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(201,149,107,0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = colors.gold;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Explore All Records
              </button>
              <button
                onClick={() => navigate('/leaderboards')}
                className="transition-all duration-200 cursor-pointer"
                style={{
                  fontFamily: fonts.sans,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '0.9375rem 2.5rem',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  color: colors.goldLight,
                  border: `1px solid rgba(201,149,107,0.3)`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = colors.gold;
                  e.currentTarget.style.backgroundColor = 'rgba(201,149,107,0.08)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(201,149,107,0.3)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                View Leaderboards
              </button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
