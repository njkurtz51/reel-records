import { Link } from 'react-router-dom';
import { slugify, formatDate } from '../utils/helpers';
import { colors, fonts, gradients } from '../utils/colors';
import FishImage from './FishImage';

export default function RecordCard({ record, showRank, rank }) {
  return (
    <Link
      to={`/species/${slugify(record.common_name)}`}
      className="block transition-all duration-300"
      style={{
        backgroundColor: colors.white,
        borderRadius: '6px',
        border: `1px solid ${colors.gray200}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        textDecoration: 'none',
        color: 'inherit',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = colors.gold;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = colors.gray200;
      }}
    >
      {/* Fish image */}
      <div style={{ position: 'relative' }}>
        <FishImage
          name={record.common_name}
          scientificName={record.scientific_name}
          size="card"
          record={record}
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
              color: colors.white,
              backgroundColor: 'rgba(11,29,58,0.75)',
              backdropFilter: 'blur(4px)',
              padding: '4px 10px',
              borderRadius: '4px',
            }}
          >
            #{rank}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3
            style={{
              fontFamily: fonts.serif,
              fontSize: '1.125rem',
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
              fontSize: '0.75rem',
              color: colors.gray400,
              fontStyle: 'italic',
            }}
          >
            {record.scientific_name}
          </p>
        </div>

        {/* Weight */}
        <div
          className="rounded-md px-4 py-3 mb-3"
          style={{ backgroundColor: colors.cream }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span
              style={{
                fontFamily: fonts.serif,
                fontSize: '1.75rem',
                fontWeight: 700,
                color: colors.navyDark,
                lineHeight: 1,
              }}
            >
              {record.weight_kg}
            </span>
            <span
              style={{
                fontFamily: fonts.sans,
                fontSize: '0.75rem',
                fontWeight: 500,
                color: colors.gray600,
              }}
            >
              kg
            </span>
            <span style={{ fontFamily: fonts.sans, fontSize: '0.6875rem', color: colors.gray400, marginLeft: 'auto' }}>
              {record.weight_lb}
            </span>
          </div>
        </div>

        {/* Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="label-caps" style={{ fontSize: '0.625rem' }}>Angler</span>
            <span style={{ fontFamily: fonts.sans, fontSize: '0.8125rem', color: colors.gray700, fontWeight: 500, textAlign: 'right' }}>
              {record.angler}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="label-caps" style={{ fontSize: '0.625rem' }}>Location</span>
            <span style={{ fontFamily: fonts.sans, fontSize: '0.8125rem', color: colors.gray700, textAlign: 'right', maxWidth: '65%' }}>
              {record.location_full}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="label-caps" style={{ fontSize: '0.625rem' }}>Date</span>
            <span style={{ fontFamily: fonts.sans, fontSize: '0.8125rem', color: colors.gray700 }}>
              {formatDate(record.catch_date)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
