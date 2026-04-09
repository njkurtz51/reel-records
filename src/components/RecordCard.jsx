import { Link } from 'react-router-dom';
import { slugify, formatDate } from '../utils/helpers';
import { colors, fonts } from '../utils/colors';
import FishImage from './FishImage';

export default function RecordCard({ record, showRank, rank }) {
  return (
    <Link
      to={`/species/${slugify(record.common_name)}`}
      className="block card-hover"
      style={{
        backgroundColor: colors.white,
        borderRadius: '10px',
        border: `1px solid ${colors.gray200}`,
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        textDecoration: 'none',
        color: 'inherit',
        overflow: 'hidden',
      }}
    >
      {/* Fish image with overlay gradient */}
      <div style={{ position: 'relative' }}>
        <FishImage
          name={record.common_name}
          scientificName={record.scientific_name}
          size="card"
          record={record}
        />
        {/* Bottom gradient overlay for depth */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.25), transparent)',
            pointerEvents: 'none',
          }}
        />
        {showRank && rank && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              fontFamily: fonts.sans,
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: rank <= 3 ? colors.navyDark : colors.white,
              backgroundColor: rank <= 3 ? colors.gold : 'rgba(11,29,58,0.7)',
              backdropFilter: 'blur(8px)',
              padding: '5px 12px',
              borderRadius: '6px',
            }}
          >
            #{rank}
          </div>
        )}
        {/* Weight badge on image */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            display: 'flex',
            alignItems: 'baseline',
            gap: '3px',
            backgroundColor: 'rgba(11,29,58,0.8)',
            backdropFilter: 'blur(8px)',
            padding: '6px 12px',
            borderRadius: '6px',
          }}
        >
          <span
            style={{
              fontFamily: fonts.serif,
              fontSize: '1.25rem',
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1,
            }}
          >
            {record.weight_kg}
          </span>
          <span
            style={{
              fontFamily: fonts.sans,
              fontSize: '0.625rem',
              fontWeight: 500,
              color: colors.goldLight,
            }}
          >
            kg
          </span>
        </div>
      </div>

      <div style={{ padding: '1.25rem' }}>
        {/* Species name */}
        <h3
          style={{
            fontFamily: fonts.serif,
            fontSize: '1.0625rem',
            fontWeight: 700,
            color: colors.navyDark,
            marginBottom: '2px',
            lineHeight: 1.3,
          }}
        >
          {record.common_name}
        </h3>
        <p
          style={{
            fontFamily: fonts.sans,
            fontSize: '0.6875rem',
            color: colors.gray400,
            fontStyle: 'italic',
            marginBottom: '1rem',
          }}
        >
          {record.scientific_name}
        </p>

        {/* Details — clean two-column layout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span
              style={{
                fontFamily: fonts.sans,
                fontSize: '0.625rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: colors.gray400,
              }}
            >
              Angler
            </span>
            <span style={{ fontFamily: fonts.sans, fontSize: '0.8125rem', color: colors.gray700, fontWeight: 500, textAlign: 'right' }}>
              {record.angler}
            </span>
          </div>
          <div
            style={{
              height: '1px',
              background: `linear-gradient(to right, transparent, ${colors.gray200}, transparent)`,
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span
              style={{
                fontFamily: fonts.sans,
                fontSize: '0.625rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: colors.gray400,
              }}
            >
              Location
            </span>
            <span style={{ fontFamily: fonts.sans, fontSize: '0.75rem', color: colors.gray600, textAlign: 'right', maxWidth: '65%' }}>
              {record.location_full}
            </span>
          </div>
          <div
            style={{
              height: '1px',
              background: `linear-gradient(to right, transparent, ${colors.gray200}, transparent)`,
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span
              style={{
                fontFamily: fonts.sans,
                fontSize: '0.625rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: colors.gray400,
              }}
            >
              Date
            </span>
            <span style={{ fontFamily: fonts.sans, fontSize: '0.8125rem', color: colors.gray600 }}>
              {formatDate(record.catch_date)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
