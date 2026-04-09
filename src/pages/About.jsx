import { Link } from 'react-router-dom';
import { colors, gradients, fonts } from '../utils/colors';

export default function About() {
  return (
    <div style={{ backgroundColor: colors.cream, minHeight: '100vh' }}>
      {/* Page header banner */}
      <div className="page-header-banner">
        <div className="max-w-4xl mx-auto px-6">
          <div className="label-caps mb-3" style={{ color: colors.gold }}>Our Story</div>
          <h1
            style={{
              fontFamily: fonts.serif,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: colors.white,
              marginBottom: '0.5rem',
            }}
          >
            About All-Tackle Records
          </h1>
          <p style={{ fontFamily: fonts.sans, fontSize: '1rem', color: 'rgba(224,196,168,0.6)', maxWidth: '500px' }}>
            Your gateway to the world's greatest fishing achievements.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>

        {/* Mission card */}
        <div
          className="p-8 md:p-10 mb-10"
          style={{
            backgroundColor: colors.white,
            borderRadius: '8px',
            border: `1px solid ${colors.gray200}`,
          }}
        >
          <h2 style={{ fontFamily: fonts.serif, fontSize: '1.75rem', fontWeight: 700, color: colors.navyDark, marginBottom: '1.25rem' }}>
            What is All-Tackle Records?
          </h2>
          <p style={{ fontFamily: fonts.sans, fontSize: '1rem', color: colors.gray700, lineHeight: 1.8, marginBottom: '1rem' }}>
            All-Tackle Records is a comprehensive, searchable database of world fishing records from the International Game Fish Association (IGFA). Whether you're a seasoned angler, a casual fisherman, or simply curious about the world's greatest catches, this platform makes it easy to explore and discover incredible achievements in the sport of fishing.
          </p>
          <p style={{ fontFamily: fonts.sans, fontSize: '1rem', color: colors.gray700, lineHeight: 1.8 }}>
            Our mission is to celebrate the dedication, skill, and adventure that goes into breaking world records, and to make this information accessible to everyone who loves fishing and the outdoors.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { num: '1,752', label: 'Species', desc: 'One record per species' },
            { num: '104', label: 'Countries', desc: 'Records from every corner of the globe' },
            { num: '1932', label: 'Earliest Record', desc: 'Over nine decades of history' },
          ].map(stat => (
            <div
              key={stat.label}
              className="text-center p-6"
              style={{
                backgroundColor: colors.white,
                borderRadius: '8px',
                border: `1px solid ${colors.gray200}`,
              }}
            >
              <div style={{ fontFamily: fonts.serif, fontSize: '2.25rem', fontWeight: 700, color: colors.navyDark }}>{stat.num}</div>
              <div className="label-caps mt-1 mb-2">{stat.label}</div>
              <p style={{ fontFamily: fonts.sans, fontSize: '0.8125rem', color: colors.gray600 }}>{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Attribution */}
        <div
          className="p-8 md:p-10 mb-10"
          style={{
            backgroundColor: colors.white,
            borderRadius: '8px',
            border: `1px solid ${colors.gray200}`,
          }}
        >
          <h2 style={{ fontFamily: fonts.serif, fontSize: '1.75rem', fontWeight: 700, color: colors.navyDark, marginBottom: '1.25rem' }}>
            Data Source & Attribution
          </h2>
          <p style={{ fontFamily: fonts.sans, fontSize: '1rem', color: colors.gray700, lineHeight: 1.8, marginBottom: '1rem' }}>
            All records in All-Tackle Records are sourced from the{' '}
            <a
              href="https://www.igfa.org/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: colors.gold, fontWeight: 600, textDecoration: 'none' }}
            >
              International Game Fish Association (IGFA)
            </a>
            , the official world record-keeping body for game fish. The IGFA has maintained these records since 1939, with some records dating back even further.
          </p>
          <p style={{ fontFamily: fonts.sans, fontSize: '1rem', color: colors.gray700, lineHeight: 1.8, marginBottom: '1.5rem' }}>
            We are incredibly grateful to the IGFA for maintaining such a detailed and comprehensive database. Their work preserves the history of sport fishing and celebrates the anglers who have pushed the boundaries of what's possible.
          </p>
          <div
            className="p-5"
            style={{
              backgroundColor: colors.cream,
              borderRadius: '6px',
              borderLeft: `3px solid ${colors.gold}`,
            }}
          >
            <div className="label-caps mb-2">IGFA Mission</div>
            <p style={{ fontFamily: fonts.serif, fontSize: '1rem', color: colors.gray700, fontStyle: 'italic', lineHeight: 1.6 }}>
              "To promote game fish conservation and the sport of angling, and to maintain and recognize game fishing records."
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-10">
          <h2 style={{ fontFamily: fonts.serif, fontSize: '1.75rem', fontWeight: 700, color: colors.navyDark, marginBottom: '1.5rem' }}>
            What You Can Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: 'Search Records', desc: 'Find any species by name, scientific name, location, or angler.' },
              { title: 'View Leaderboards', desc: 'Explore top records, countries, anglers, and historical rankings.' },
              { title: 'Filter by Location', desc: 'Discover catches from different countries around the world.' },
              { title: 'Browse Categories', desc: 'Explore freshwater, saltwater, sharks, tropical species, and more.' },
              { title: 'Species Details', desc: 'Scientific names, related species, and full record information.' },
              { title: 'Get Inspired', desc: 'Incredible achievements by anglers worldwide since 1932.' },
            ].map(feature => (
              <div
                key={feature.title}
                className="p-5"
                style={{
                  backgroundColor: colors.white,
                  borderRadius: '6px',
                  border: `1px solid ${colors.gray200}`,
                }}
              >
                <h3 style={{ fontFamily: fonts.sans, fontSize: '0.9375rem', fontWeight: 700, color: colors.navyDark, marginBottom: '0.5rem' }}>
                  {feature.title}
                </h3>
                <p style={{ fontFamily: fonts.sans, fontSize: '0.875rem', color: colors.gray600, lineHeight: 1.6 }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Future Plans */}
        <div
          className="p-8 md:p-10 mb-10"
          style={{
            backgroundColor: colors.white,
            borderRadius: '8px',
            border: `1px solid ${colors.gray200}`,
          }}
        >
          <h2 style={{ fontFamily: fonts.serif, fontSize: '1.75rem', fontWeight: 700, color: colors.navyDark, marginBottom: '1rem' }}>
            What's Next
          </h2>
          <p style={{ fontFamily: fonts.sans, fontSize: '1rem', color: colors.gray700, lineHeight: 1.8, marginBottom: '1.25rem' }}>
            All-Tackle Records is just getting started. Here's what's on the roadmap:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              'Photo galleries of record-breaking catches',
              'Community submissions and user-contributed records',
              'Interactive maps showing where records were set',
              'Detailed species information and biology',
              'Fishing tips and techniques from record holders',
              'Mobile app for on-the-go browsing',
            ].map(item => (
              <div key={item} className="flex gap-3 items-start">
                <span style={{ color: colors.gold, fontWeight: 700, fontSize: '1rem', lineHeight: '1.6' }}>+</span>
                <span style={{ fontFamily: fonts.sans, fontSize: '0.9375rem', color: colors.gray700, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech banner */}
        <div
          className="p-8 md:p-10 mb-10 text-center"
          style={{
            background: gradients.navyForest,
            borderRadius: '8px',
          }}
        >
          <h2 style={{ fontFamily: fonts.serif, fontSize: '1.5rem', fontWeight: 700, color: colors.white, marginBottom: '0.5rem' }}>
            Built With Modern Technology
          </h2>
          <p style={{ fontFamily: fonts.sans, fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginBottom: '2rem' }}>
            Fast, responsive, and works on any device.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'React', desc: 'UI Framework' },
              { name: 'Vite', desc: 'Build Tool' },
              { name: 'Tailwind', desc: 'Styling' },
              { name: 'React Router', desc: 'Navigation' },
            ].map(tech => (
              <div
                key={tech.name}
                className="p-4"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '6px' }}
              >
                <div style={{ fontFamily: fonts.sans, fontWeight: 700, color: colors.white, fontSize: '0.875rem' }}>{tech.name}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: '0.6875rem', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4 pb-8">
          <h2 style={{ fontFamily: fonts.serif, fontSize: '1.75rem', fontWeight: 700, color: colors.navyDark, marginBottom: '1.5rem' }}>
            Ready to Explore?
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-block transition-all duration-200"
              style={{
                fontFamily: fonts.sans, fontSize: '0.875rem', fontWeight: 600,
                letterSpacing: '0.04em', textTransform: 'uppercase',
                padding: '0.75rem 2rem', borderRadius: '6px',
                backgroundColor: colors.gold, color: colors.navyDark,
                textDecoration: 'none',
              }}
            >
              Home
            </Link>
            <Link
              to="/records"
              className="inline-block transition-all duration-200"
              style={{
                fontFamily: fonts.sans, fontSize: '0.875rem', fontWeight: 600,
                letterSpacing: '0.04em', textTransform: 'uppercase',
                padding: '0.75rem 2rem', borderRadius: '6px',
                backgroundColor: colors.white, color: colors.navyDark,
                textDecoration: 'none', border: `1px solid ${colors.gray300}`,
              }}
            >
              Browse Records
            </Link>
            <Link
              to="/leaderboards"
              className="inline-block transition-all duration-200"
              style={{
                fontFamily: fonts.sans, fontSize: '0.875rem', fontWeight: 600,
                letterSpacing: '0.04em', textTransform: 'uppercase',
                padding: '0.75rem 2rem', borderRadius: '6px',
                backgroundColor: colors.white, color: colors.navyDark,
                textDecoration: 'none', border: `1px solid ${colors.gray300}`,
              }}
            >
              Leaderboards
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
