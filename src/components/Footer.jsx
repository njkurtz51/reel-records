import { Link } from 'react-router-dom';
import { colors, fonts } from '../utils/colors';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: colors.navyDark }}>
      {/* Gold accent line at top */}
      <div
        style={{
          height: '3px',
          background: `linear-gradient(to right, transparent, ${colors.gold}, transparent)`,
        }}
      />
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            {/* Logo matching navbar style */}
            <div className="flex items-center gap-2 mb-4">
              <div
                style={{
                  width: '3px',
                  height: '24px',
                  background: `linear-gradient(to bottom, ${colors.gold}, ${colors.goldDark})`,
                  borderRadius: '2px',
                }}
              />
              <div>
                <span
                  style={{
                    fontFamily: fonts.serif,
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: colors.white,
                    letterSpacing: '0.08em',
                    display: 'block',
                    lineHeight: 1.1,
                  }}
                >
                  ALL-TACKLE
                </span>
                <span
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: '0.5rem',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: colors.gold,
                    display: 'block',
                  }}
                >
                  RECORDS
                </span>
              </div>
            </div>
            <p style={{ fontFamily: fonts.sans, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7 }}>
              The most comprehensive database of IGFA world fishing records. Celebrating anglers and their incredible achievements since 1932.
            </p>
          </div>

          <div>
            <h3
              style={{
                fontFamily: fonts.sans,
                fontSize: '0.625rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: colors.gold,
                marginBottom: '1.25rem',
              }}
            >
              Navigate
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { to: '/', label: 'Home' },
                { to: '/records', label: 'Browse Records' },
                { to: '/leaderboards', label: 'Leaderboards' },
                { to: '/about', label: 'About' },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={{
                      fontFamily: fonts.sans,
                      fontSize: '0.8125rem',
                      color: 'rgba(255,255,255,0.4)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.target.style.color = colors.goldLight)}
                    onMouseLeave={e => (e.target.style.color = 'rgba(255,255,255,0.4)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              style={{
                fontFamily: fonts.sans,
                fontSize: '0.625rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: colors.gold,
                marginBottom: '1.25rem',
              }}
            >
              Data Source
            </h3>
            <p style={{ fontFamily: fonts.sans, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, marginBottom: '1rem' }}>
              Records sourced from the{' '}
              <a
                href="https://www.igfa.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: colors.goldLight, textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.target.style.opacity = '0.7')}
                onMouseLeave={e => (e.target.style.opacity = '1')}
              >
                International Game Fish Association
              </a>
            </p>
            <p style={{ fontFamily: fonts.sans, fontSize: '0.6875rem', color: 'rgba(255,255,255,0.2)' }}>
              Last updated April 2026
            </p>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <p
            style={{
              fontFamily: fonts.sans,
              fontSize: '0.6875rem',
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.03em',
            }}
          >
            &copy; 2026 All-Tackle Records. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
