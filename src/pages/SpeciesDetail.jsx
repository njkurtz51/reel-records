import { useParams, Link, useNavigate } from 'react-router-dom';
import { findRecordBySlug, findRecordsByGenus, formatDate } from '../utils/helpers';
import { colors, fonts, gradients } from '../utils/colors';
import RecordCard from '../components/RecordCard';
import FishImage from '../components/FishImage';

export default function SpeciesDetail({ records }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const record = findRecordBySlug(records, slug);

  if (!record) {
    return (
      <div
        className="flex flex-col items-center justify-center"
        style={{ minHeight: '100vh', paddingTop: '5rem', backgroundColor: colors.cream }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🐟</div>
        <h1
          style={{
            fontFamily: fonts.serif,
            fontSize: '2.5rem',
            fontWeight: 700,
            color: colors.navyDark,
            marginBottom: '1rem',
          }}
        >
          Species Not Found
        </h1>
        <p style={{ fontFamily: fonts.sans, color: colors.gray600, marginBottom: '2rem' }}>
          We couldn't find the species you're looking for.
        </p>
        <Link
          to="/records"
          className="transition-all duration-200"
          style={{
            fontFamily: fonts.sans,
            fontSize: '0.875rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            padding: '0.875rem 2rem',
            borderRadius: '8px',
            backgroundColor: colors.gold,
            color: colors.navyDark,
            textDecoration: 'none',
          }}
        >
          Back to Records
        </Link>
      </div>
    );
  }

  const relatedSpecies = findRecordsByGenus(records, record.genus)
    .filter(r => r.id !== record.id)
    .slice(0, 3);

  const infoItems = [
    { label: 'Angler', value: record.angler, bold: true },
    { label: 'Catch Date', value: formatDate(record.catch_date) },
    { label: 'Location', value: record.location_full },
    { label: 'Country', value: record.country, bold: true },
  ];

  const techItems = [
    { label: 'Record Type', value: record.record_type },
    { label: 'Species ID', value: record.id, mono: true },
    { label: 'Scientific Name', value: record.scientific_name, italic: true },
    { label: 'Genus', value: record.genus, italic: true },
  ];

  return (
    <div style={{ backgroundColor: colors.cream, minHeight: '100vh' }}>
      {/* Page header banner */}
      <div className="page-header-banner" style={{ paddingBottom: '2rem' }}>
        <div className="max-w-5xl mx-auto px-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 border-none bg-transparent cursor-pointer flex items-center gap-2 transition-colors"
            style={{ fontFamily: fonts.sans, fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(224,196,168,0.6)' }}
            onMouseEnter={e => (e.target.style.color = colors.goldLight)}
            onMouseLeave={e => (e.target.style.color = 'rgba(224,196,168,0.6)')}
          >
            ← Back
          </button>
          <span
            className="inline-block mb-4"
            style={{
              fontFamily: fonts.sans,
              fontSize: '0.625rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: colors.gold,
              backgroundColor: 'rgba(201,149,107,0.12)',
              padding: '5px 12px',
              borderRadius: '4px',
              border: '1px solid rgba(201,149,107,0.15)',
            }}
          >
            {record.record_type}
          </span>
          <h1
            style={{
              fontFamily: fonts.serif,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: colors.white,
              marginBottom: '0.375rem',
              lineHeight: 1.1,
            }}
          >
            {record.common_name}
          </h1>
          <p style={{ fontFamily: fonts.sans, fontSize: '1rem', color: colors.goldLight, fontStyle: 'italic' }}>
            {record.scientific_name}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6" style={{ paddingBottom: '4rem' }}>
        {/* Main card — pulled up over banner */}
        <div
          className="overflow-hidden"
          style={{
            borderRadius: '12px',
            backgroundColor: colors.white,
            border: `1px solid ${colors.gray200}`,
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            marginTop: '-1rem',
            marginBottom: '3rem',
          }}
        >
          {/* Fish image */}
          <FishImage
            name={record.common_name}
            scientificName={record.scientific_name}
            size="detail"
            record={record}
          />

          {/* Weight strip */}
          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ borderBottom: `1px solid ${colors.gray200}` }}
          >
            <div
              className="text-center p-8"
              style={{ borderRight: `1px solid ${colors.gray200}` }}
            >
              <div className="label-caps mb-2" style={{ fontSize: '0.625rem' }}>Weight</div>
              <div
                style={{
                  fontFamily: fonts.serif,
                  fontSize: '3rem',
                  fontWeight: 700,
                  color: colors.navyDark,
                  lineHeight: 1,
                }}
              >
                {record.weight_kg}
              </div>
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontSize: '0.75rem',
                  color: colors.gray400,
                  marginTop: '6px',
                  fontWeight: 500,
                }}
              >
                kilograms
              </div>
            </div>
            <div
              className="text-center p-8"
              style={{ borderRight: `1px solid ${colors.gray200}` }}
            >
              <div className="label-caps mb-2" style={{ fontSize: '0.625rem' }}>Imperial</div>
              <div
                style={{
                  fontFamily: fonts.serif,
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: colors.navyDark,
                }}
              >
                {record.weight_lb}
              </div>
            </div>
            <div className="text-center p-8">
              <div className="label-caps mb-2" style={{ fontSize: '0.625rem' }}>Status</div>
              <span
                style={{
                  fontFamily: fonts.sans,
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  backgroundColor: '#dcfce7',
                  color: '#166534',
                  padding: '6px 18px',
                  borderRadius: '20px',
                  display: 'inline-block',
                }}
              >
                {record.status}
              </span>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-10" style={{ borderRight: `1px solid ${colors.gray200}` }}>
              <h3
                style={{
                  fontFamily: fonts.serif,
                  fontSize: '1.1875rem',
                  fontWeight: 700,
                  color: colors.navyDark,
                  marginBottom: '1.5rem',
                }}
              >
                Record Information
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {infoItems.map(item => (
                  <div key={item.label}>
                    <div className="label-caps mb-1" style={{ fontSize: '0.625rem' }}>{item.label}</div>
                    <p
                      style={{
                        fontFamily: fonts.sans,
                        fontSize: '0.9375rem',
                        color: colors.navyDark,
                        fontWeight: item.bold ? 600 : 400,
                        lineHeight: 1.4,
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 md:p-10">
              <h3
                style={{
                  fontFamily: fonts.serif,
                  fontSize: '1.1875rem',
                  fontWeight: 700,
                  color: colors.navyDark,
                  marginBottom: '1.5rem',
                }}
              >
                Technical Details
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {techItems.map(item => (
                  <div key={item.label}>
                    <div className="label-caps mb-1" style={{ fontSize: '0.625rem' }}>{item.label}</div>
                    <p
                      style={{
                        fontFamily: item.mono ? "'JetBrains Mono', monospace" : fonts.sans,
                        fontSize: item.mono ? '0.8125rem' : '0.9375rem',
                        color: colors.navyDark,
                        fontStyle: item.italic ? 'italic' : 'normal',
                        lineHeight: 1.4,
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Species */}
        {relatedSpecies.length > 0 && (
          <div className="mb-10">
            <div className="label-caps mb-2" style={{ color: colors.gold }}>Same Genus</div>
            <h2
              style={{
                fontFamily: fonts.serif,
                fontSize: '1.75rem',
                fontWeight: 700,
                color: colors.navyDark,
                marginBottom: '0.5rem',
              }}
            >
              Related Species
            </h2>
            <div className="section-divider" style={{ marginBottom: '1.5rem' }} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedSpecies.map(related => (
                <RecordCard key={related.id} record={related} />
              ))}
            </div>
          </div>
        )}

        {relatedSpecies.length === 0 && (
          <div
            className="text-center py-10 mb-10"
            style={{
              borderRadius: '10px',
              backgroundColor: colors.white,
              border: `1px solid ${colors.gray200}`,
            }}
          >
            <p style={{ fontFamily: fonts.sans, fontSize: '0.9375rem', color: colors.gray400 }}>
              No other records found in the same genus.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center py-6">
          <Link
            to="/records"
            className="inline-block transition-all duration-200"
            style={{
              fontFamily: fonts.sans,
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              padding: '0.9375rem 2.5rem',
              borderRadius: '8px',
              backgroundColor: colors.gold,
              color: colors.navyDark,
              textDecoration: 'none',
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
          </Link>
        </div>
      </div>
    </div>
  );
}
