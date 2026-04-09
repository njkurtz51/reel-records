import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { colors, gradients, fonts } from '../utils/colors';
import {
  getTopRecords,
  getCountryCounts,
  getAnglerCounts,
  getOldestRecords,
  getLatestRecords,
  slugify,
} from '../utils/helpers';

export default function Leaderboards({ records }) {
  const topHeaviest = useMemo(() => getTopRecords(records, 25), [records]);
  const countryCounts = useMemo(() => getCountryCounts(records).slice(0, 10), [records]);
  const oldestRecords = useMemo(() => getOldestRecords(records, 10), [records]);
  const newestRecords = useMemo(() => getLatestRecords(records, 10), [records]);
  const topAnglers = useMemo(() => getAnglerCounts(records).slice(0, 10), [records]);

  const LeaderboardTable = ({ title, subtitle, headers, rows, showRank = false }) => (
    <div
      className="overflow-hidden mb-8"
      style={{
        borderRadius: '10px',
        backgroundColor: colors.white,
        border: `1px solid ${colors.gray200}`,
        boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
      }}
    >
      <div
        className="p-6"
        style={{
          borderBottom: `1px solid ${colors.gray200}`,
          background: `linear-gradient(to right, ${colors.white}, ${colors.gray50})`,
        }}
      >
        <h3 style={{ fontFamily: fonts.serif, fontSize: '1.25rem', fontWeight: 700, color: colors.navyDark }}>
          {title}
        </h3>
        {subtitle && (
          <p style={{ fontFamily: fonts.sans, fontSize: '0.8125rem', color: colors.gray400, marginTop: '4px' }}>
            {subtitle}
          </p>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left" style={{ fontFamily: fonts.sans, fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ backgroundColor: colors.gray50, borderBottom: `2px solid ${colors.gray200}` }}>
              {showRank && (
                <th
                  className="px-5 py-3"
                  style={{
                    fontWeight: 600,
                    fontSize: '0.625rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: colors.gray400,
                    width: '56px',
                  }}
                >
                  #
                </th>
              )}
              {headers.map(header => (
                <th
                  key={header}
                  className="px-5 py-3"
                  style={{
                    fontWeight: 600,
                    fontSize: '0.625rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: colors.gray400,
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className="table-row-hover"
                style={{
                  backgroundColor: idx % 2 === 0 ? colors.white : colors.gray50,
                  borderBottom: `1px solid ${colors.gray200}`,
                }}
              >
                {showRank && (
                  <td className="px-5 py-3">
                    <span
                      style={{
                        fontFamily: fonts.serif,
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        color: idx < 3 ? colors.gold : colors.gray300,
                      }}
                    >
                      {idx + 1}
                    </span>
                  </td>
                )}
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="px-5 py-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const speciesLink = (record) => (
    <Link
      to={`/species/${slugify(record.common_name)}`}
      style={{
        color: colors.navyDark,
        fontWeight: 600,
        textDecoration: 'none',
        transition: 'color 0.2s',
      }}
      onMouseEnter={e => (e.target.style.color = colors.gold)}
      onMouseLeave={e => (e.target.style.color = colors.navyDark)}
    >
      {record.common_name}
    </Link>
  );

  const topHeaviestRows = topHeaviest.map(record => [
    speciesLink(record),
    <span key="w" style={{ fontWeight: 700, color: colors.navyDark, fontFamily: fonts.serif }}>{record.weight_kg} kg</span>,
    <span key="lb" style={{ color: colors.gray400, fontSize: '0.8125rem' }}>{record.weight_lb}</span>,
    <span key="a" style={{ color: colors.gray700 }}>{record.angler}</span>,
    <span key="loc" style={{ fontSize: '0.8125rem', color: colors.gray400 }}>{record.location_full}</span>,
  ]);

  const countrySortedRows = countryCounts.map(({ country, count }) => [
    <span key="c" style={{ fontWeight: 600, color: colors.navyDark }}>{country}</span>,
    <span key="n" style={{ fontWeight: 700, color: colors.navyDark, fontFamily: fonts.serif }}>{count}</span>,
  ]);

  const oldestRows = oldestRecords.map(record => [
    speciesLink(record),
    <span key="d" style={{ color: colors.gray600 }}>{record.catch_date_display}</span>,
    <span key="y" style={{ fontSize: '0.8125rem', color: colors.gray400 }}>
      {Math.floor((new Date() - new Date(record.catch_date)) / (1000 * 60 * 60 * 24 * 365))} years
    </span>,
    <span key="a" style={{ color: colors.gray700 }}>{record.angler}</span>,
  ]);

  const newestRows = newestRecords.map(record => [
    speciesLink(record),
    <span key="d" style={{ color: colors.gray600 }}>{record.catch_date_display}</span>,
    <span key="a" style={{ color: colors.gray700 }}>{record.angler}</span>,
    <span key="loc" style={{ fontSize: '0.8125rem', color: colors.gray400 }}>{record.location_full}</span>,
  ]);

  const anglerRows = topAnglers.map(({ angler, count }) => [
    <span key="a" style={{ fontWeight: 600, color: colors.navyDark }}>{angler}</span>,
    <span key="n" style={{ fontWeight: 700, color: colors.navyDark, fontFamily: fonts.serif }}>{count}</span>,
  ]);

  return (
    <div style={{ backgroundColor: colors.cream, minHeight: '100vh' }}>
      {/* Page header banner */}
      <div className="page-header-banner">
        <div className="max-w-7xl mx-auto px-6">
          <div className="label-caps mb-3" style={{ color: colors.gold }}>Rankings</div>
          <h1
            style={{
              fontFamily: fonts.serif,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: colors.white,
              marginBottom: '0.5rem',
            }}
          >
            Leaderboards
          </h1>
          <p style={{ fontFamily: fonts.sans, fontSize: '1rem', color: 'rgba(224,196,168,0.6)', maxWidth: '500px' }}>
            Rankings and achievements across the world of fishing records.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
        <LeaderboardTable
          title="Top 25 Heaviest Catches"
          subtitle="The biggest fish ever recorded, ranked by weight"
          headers={['Species', 'Weight', 'Imperial', 'Angler', 'Location']}
          rows={topHeaviestRows}
          showRank={true}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-2">
          <LeaderboardTable
            title="Top Countries"
            subtitle="Most world records by nation"
            headers={['Country', 'Records']}
            rows={countrySortedRows}
            showRank={true}
          />
          <LeaderboardTable
            title="Most Prolific Anglers"
            subtitle="Anglers with the most world records"
            headers={['Angler', 'Records']}
            rows={anglerRows}
            showRank={true}
          />
        </div>

        <LeaderboardTable
          title="Oldest Standing Records"
          subtitle="Records that have stood the test of time"
          headers={['Species', 'Date Caught', 'Standing', 'Angler']}
          rows={oldestRows}
          showRank={true}
        />

        <LeaderboardTable
          title="Newest Records"
          subtitle="The most recently authenticated world records"
          headers={['Species', 'Date Caught', 'Angler', 'Location']}
          rows={newestRows}
          showRank={true}
        />

        {/* Stats banner */}
        <div
          className="text-center p-12 mt-4"
          style={{
            background: gradients.navyForest,
            borderRadius: '12px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative accent */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 50%, rgba(201,149,107,0.5) 0%, transparent 50%),
                                radial-gradient(circle at 70% 50%, rgba(27,67,50,0.5) 0%, transparent 50%)`,
            }}
          />
          <div className="relative">
            <div className="label-caps mb-3" style={{ color: colors.gold }}>Overview</div>
            <h2 style={{ fontFamily: fonts.serif, fontSize: '2rem', fontWeight: 700, color: colors.white, marginBottom: '2.5rem' }}>
              By The Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { num: records.length.toLocaleString(), label: 'Total Records' },
                { num: String(new Set(records.map(r => r.country)).size), label: 'Countries' },
                { num: String(topAnglers.length), label: 'Record Holders' },
                { num: records.reduce((min, r) => { const y = new Date(r.catch_date).getFullYear(); return y < min ? y : min; }, 9999).toString(), label: 'Earliest Record' },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{ fontFamily: fonts.serif, fontSize: '2.25rem', fontWeight: 700, color: colors.white, lineHeight: 1 }}>
                    {stat.num}
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.sans,
                      fontSize: '0.625rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
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
          </div>
        </div>
      </div>
    </div>
  );
}
