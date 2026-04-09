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
          style={{
            fontFamily: fonts.sans,
            fontSize: '0.875rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            padding: '0.75rem 2rem',
            borderRadius: '6px',
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

  return (
    <div style={{ backgroundColor: colors.cream, minHeight: '100vh', paddingTop: '5rem', paddingBottom: '4rem' }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 border-none bg-transparent cursor-pointer flex items-center gap-2 transition-colors"
          style={{ fontFamily: fonts.sans, fontSize: '0.875rem', fontWeight: 500, color: colors.gray600 }}
          onMouseEnter={e => (e.target.style.color = colors.gold)}
          onMouseLeave={e => (e.target.style.color = colors.gray600)}
        >
          &larr; Back
        </button>

        {/* Main card */}
        <div
          className="overflow-hidden mb-12"
          style={{
            borderRadius: '8px',
            backgroundColor: colors.white,
            border: `1px solid ${colors.gray200}`,
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          {/* Fish image */}
          <FishImage
            name={record.common_name}
            scientificName={record.scientific_name}
            size="detail"
            record={record}
          />

          {/* Hero header */}
          <div
            className="p-8 md:p-12"
            style={{ background: gradients.navyForest }}
          >
            <span
              className="inline-block mb-6"
              style={{
                fontFamily: fonts.sans,
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: colors.goldLight,
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '4px 12px',
                borderRadius: '4px',
              }}
            >
              {record.record_type}
            </span>

            <h1
              style={{
                fontFamily: fonts.serif,
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 700,
                color: colors.white,
                marginBottom: '0.5rem',
                lineHeight: 1.1,
              }}
            >
              {record.common_name}
            </h1>
            <p style={{ fontFamily: fonts.sans, fontSize: '1.125rem', color: colors.goldLight, fontStyle: 'italic' }}>
              {record.scientific_name}
            </p>
          </div>

          {/* Weight strip */}
          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ borderBottom: `1px solid ${colors.gray200}` }}
          >
            <div className="text-center p-8" style={{ borderRight: `1px solid ${colors.gray200}` }}>
              <div className="label-caps mb-2">Weight</div>
              <div style={{ fontFamily: fonts.serif, fontSize: '3.5rem', fontWeight: 700, color: colors.navyDark, lineHeight: 1 }}>
                {record.weight_kg}
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: '0.8125rem', color: colors.gray600, marginTop: '4px' }}>kilograms</div>
            </div>
            <div className="text-center p-8" style={{ borderRight: `1px solid ${colors.gray200}` }}>
              <div className="label-caps mb-2">Imperial</div>
              <div style={{ fontFamily: fonts.serif, fontSize: '1.5rem', fontWeight: 700, color: colors.navyDark }}>
                {record.weight_lb}
              </div>
            </div>
            <div className="text-center p-8">
              <div className="label-caps mb-2">Status</div>
              <span
                style={{
                  fontFamily: fonts.sans,
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  backgroundColor: '#dcfce7',
                  color: '#166534',
                  padding: '6px 16px',
                  borderRadius: '20px',
                }}
              >
                {record.status}
              </span>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
            <div>
              <h3
                style={{
                  fontFamily: fonts.serif,
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: colors.navyDark,
                  marginBottom: '1.5rem',
                }}
              >
                Record Information
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { label: 'Angler', value: record.angler, bold: true },
                  { label: 'Catch Date', value: formatDate(record.catch_date) },
                  { label: 'Location', value: record.location_full },
                  { label: 'Country', value: record.country, bold: true },
                ].map(item => (
                  <div key={item.label}>
                    <div className="label-caps mb-1">{item.label}</div>
                    <p style={{
                      fontFamily: fonts.sans,
                      fontSize: '1rem',
                      color: colors.navyDark,
                      fontWeight: item.bold ? 600 : 400,
                    }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3
                style={{
                  fontFamily: fonts.serif,
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: colors.navyDark,
                  marginBottom: '1.5rem',
                }}
              >
                Technical Details
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { label: 'Record Type', value: record.record_type },
                  { label: 'Species ID', value: record.id, mono: true },
                  { label: 'Scientific Name', value: record.scientific_name, italic: true },
                  { label: 'Genus', value: record.genus, italic: true },
                ].map(item => (
                  <div key={item.label}>
                    <div className="label-caps mb-1">{item.label}</div>
                    <p style={{
                      fontFamily: item.mono ? 'monospace' : fonts.sans,
                      fontSize: '1rem',
                      color: colors.navyDark,
                      fontStyle: item.italic ? 'italic' : 'normal',
                    }}>
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
          <div className="mb-12">
            <div className="label-caps mb-3" style={{ color: colors.gold }}>Same Genus</div>
            <h2
              style={{
                fontFamily: fonts.serif,
                fontSize: '1.75rem',
                fontWeight: 700,
                color: colors.navyDark,
                marginBottom: '1.5rem',
              }}
            >
              Related Species
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedSpecies.map(related => (
                <RecordCard key={related.id} record={related} />
              ))}
            </div>
          </div>
        )}

        {relatedSpecies.length === 0 && (
          <div
            className="text-center py-10 mb-12"
            style={{
              borderRadius: '8px',
              backgroundColor: colors.white,
              border: `1px solid ${colors.gray200}`,
            }}
          >
            <p style={{ fontFamily: fonts.sans, fontSize: '0.9375rem', color: colors.gray600 }}>
              No other records found in the same genus.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center py-8">
          <Link
            to="/records"
            className="inline-block transition-all duration-200"
            style={{
              fontFamily: fonts.sans,
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              padding: '0.875rem 2.5rem',
              borderRadius: '6px',
              backgroundColor: colors.gold,
              color: colors.navyDark,
              textDecoration: 'none',
            }}
          >
            Explore All Records
          </Link>
        </div>
      </div>
    </div>
  );
}
