import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { colors, fonts } from '../utils/colors';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/records', label: 'Records' },
    { to: '/leaderboards', label: 'Leaderboards' },
    { to: '/about', label: 'About' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: colors.navy,
        borderBottom: `1px solid rgba(201,149,107,0.15)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center" style={{ height: '64px' }}>
          <Link to="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
            <span
              className="text-xl font-bold tracking-wide"
              style={{
                fontFamily: fonts.serif,
                color: colors.goldLight,
                letterSpacing: '0.02em',
              }}
            >
              REEL RECORDS
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.label}
                to={link.to}
                className="px-4 py-2 rounded-md transition-all duration-200"
                style={{
                  fontFamily: fonts.sans,
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: isActive(link.to) ? colors.goldLight : 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  backgroundColor: isActive(link.to) ? 'rgba(201,149,107,0.1)' : 'transparent',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = colors.goldLight;
                  e.currentTarget.style.backgroundColor = 'rgba(201,149,107,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = isActive(link.to) ? colors.goldLight : 'rgba(255,255,255,0.6)';
                  e.currentTarget.style.backgroundColor = isActive(link.to) ? 'rgba(201,149,107,0.1)' : 'transparent';
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden text-white border-none bg-transparent cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ fontSize: '1.5rem', lineHeight: 1 }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {menuOpen && (
          <div
            className="md:hidden pb-4 flex flex-col gap-1"
            style={{ borderTop: `1px solid rgba(201,149,107,0.2)`, paddingTop: '0.75rem' }}
          >
            {navLinks.map(link => (
              <Link
                key={link.label}
                to={link.to}
                className="px-4 py-3 rounded-md transition-colors"
                style={{
                  fontFamily: fonts.sans,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: isActive(link.to) ? colors.goldLight : 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
