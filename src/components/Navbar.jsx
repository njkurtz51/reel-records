import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { colors, fonts } from '../utils/colors';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(11,29,58,0.97)' : 'rgba(11,29,58,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: scrolled
          ? '1px solid rgba(201,149,107,0.2)'
          : '1px solid rgba(255,255,255,0.05)',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.15)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center" style={{ height: '72px' }}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
            {/* Small gold accent bar */}
            <div
              style={{
                width: '3px',
                height: '28px',
                background: `linear-gradient(to bottom, ${colors.gold}, ${colors.goldDark})`,
                borderRadius: '2px',
              }}
            />
            <div>
              <span
                style={{
                  fontFamily: fonts.serif,
                  fontSize: '1.125rem',
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
                  fontSize: '0.5625rem',
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
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.label}
                to={link.to}
                className="px-4 py-2 rounded-md transition-all duration-200 relative"
                style={{
                  fontFamily: fonts.sans,
                  fontSize: '0.8125rem',
                  fontWeight: isActive(link.to) ? 600 : 500,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: isActive(link.to) ? colors.goldLight : 'rgba(255,255,255,0.55)',
                  textDecoration: 'none',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = colors.goldLight;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = isActive(link.to) ? colors.goldLight : 'rgba(255,255,255,0.55)';
                }}
              >
                {link.label}
                {isActive(link.to) && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '20px',
                      height: '2px',
                      background: colors.gold,
                      borderRadius: '1px',
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden border-none bg-transparent cursor-pointer p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div style={{ width: '22px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <span
                className="transition-all duration-300"
                style={{
                  display: 'block',
                  height: '2px',
                  backgroundColor: colors.goldLight,
                  borderRadius: '1px',
                  transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
                }}
              />
              <span
                className="transition-all duration-300"
                style={{
                  display: 'block',
                  height: '2px',
                  backgroundColor: colors.goldLight,
                  borderRadius: '1px',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="transition-all duration-300"
                style={{
                  display: 'block',
                  height: '2px',
                  backgroundColor: colors.goldLight,
                  borderRadius: '1px',
                  transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
                }}
              />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: menuOpen ? '300px' : '0',
            opacity: menuOpen ? 1 : 0,
            borderTop: menuOpen ? '1px solid rgba(201,149,107,0.15)' : 'none',
          }}
        >
          <div className="py-3 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.label}
                to={link.to}
                className="px-4 py-3 rounded-md transition-colors"
                style={{
                  fontFamily: fonts.sans,
                  fontSize: '0.875rem',
                  fontWeight: isActive(link.to) ? 600 : 500,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: isActive(link.to) ? colors.goldLight : 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
