import { Link } from 'react-router-dom';
import { colors, fonts } from '../utils/colors';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: colors.navyDark }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div
              className="mb-4"
              style={{
                fontFamily: fonts.serif,
                fontSize: '1.25rem',
                fontWeight: 700,
                color: colors.goldLight,
                letterSpacing: '0.02em',
              }}
            >
              REEL RECORDS
            </div>
            <p style={{ fontFamily: fonts.sans, fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
              The most comprehensive database of IGFA world fishing records. Celebrating anglers and their incredible achievements since 1932.
            </p>
          </div>

          <div>
            <h3
              style={{
                fontFamily: fonts.sans,
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
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
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.5)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.target.style.color = colors.goldLight)}
                    onMouseLeave={e => (e.target.style.color = 'rgba(255,255,255,0.5)')}
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
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '1.25rem',
              }}
            >
              Data Source
            </h3>
            <p style={{ fontFamily: fonts.sans, fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: '1rem' }}>
              Records sourced from the{' '}
              <a
                href="https://www.igfa.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: colors.goldLight, textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.target.style.opacity = '0.8')}
                onMouseLeave={e => (e.target.style.opacity = '1')}
              >
                International Game Fish Association
              </a>
            </p>
            <p style={{ fontFamily: fonts.sans, fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}>
              Last updated April 2026
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem' }}>
          <p
            className="text-center"
            style={{
              fontFamily: fonts.sans,
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.02em',
            }}
          >
            &copy; 2026 Reel Records. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
