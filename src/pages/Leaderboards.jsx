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
      className="overflow-hidden mb-10"
      style={{
        borderRadius: '8px',
        backgroundColor: colors.white,
        border: `1px solid ${colors.gray200}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <div className="p-6" style={{ borderBottom: `1px solid ${colors.gray200}` }}>
        <h3 style={{ fontFamily: fonts.serif, fontSize: '1.375rem', fontWeight: 700, color: colors.navyDark }}>
          {title}
        </h3>
        {subtitle && (
          <p style={{ fontFamily: fonts.sans, fontSize: '0.8125rem', color: colors.gray600, marginTop: '4px' }}>
            {subtitle}
          </p>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left" style={{ fontFamily: fonts.sans, fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ backgroundColor: colors.gray50, borderBottom: `2px solid ${colors.gray200}` }}>
              {showRank && (
                <th className="px-5 py-3" style={{ fontWeight: 600, fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: colors.gray600, width: '60px' }}>
                  #
                </th>
              )}
              {headers.map(header => (
                <th key={header} className="px-5 py-3" style={{ fontWeight: 600, fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: colors.gray600 }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                style={{
                  backgroundColor: idx % 2 === 0 ? colors.white : colors.gray50,
                  borderBottom: `1px solid ${colors.gray200}`,
                  transition: 'background-color 0.15s',
                }}
              >
                {showRank && (
                  <td className="px-5 py-3">
                    <span
                      style={{
                        fontFamily: fonts.sans,
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        color: idx < 3 ? colors.gold : colors.gray400,
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
    <span key="lb" style={{ color: colors.gray600, fontSize: '0.8125rem' }}>{record.weight_lb}</span>,
    record.angler,
    <span key="loc" style={{ fontSize: '0.8125rem', color: colors.gray600 }}>{record.location_full}</span>,
  ]);

  const countrySortedRows = countryCounts.map(({ country, count }) => [
    <span key="c" style={{ fontWeight: 600, color: colors.navyDark }}>{country}</span>,
    <span key="n" style={{ fontWeight: 700, color: colors.navyDark, fontFamily: fonts.serif }}>{count}</span>,
  ]);

  const oldestRows = oldestRecords.map(record => [
    speciesLink(record),
    record.catch_date_display,
    <span key="y" style={{ fontSize: '0.8125rem', color: colors.gray600 }}>
      {Math.floor((new Date() - new Date(record.catch_date)) / (1000 * 60 * 60 * 24 * 365))} years
    </span>,
    record.angler,
  ]);

  const newestRows = newestRecords.map(record => [
    speciesLink(record),
    record.catch_date_display,
    record.angler,
    <span key="loc" style={{ fontSize: '0.8125rem', color: colors.gray600 }}>{record.location_full}</span>,
  ]);

  const anglerRows = topAnglers.map(({ angler, count }) => [
    <span key="a" style={{ fontWeight: 600, color: colors.navyDark }}>{angler}</span>,
    <span key="n" style={{ fontWeight: 700, color: colors.navyDark, fontFamily: fonts.serif }}>{count}</span>,
  ]);

  return (
    <div style={{ backgroundColor: colors.cream, minHeight: '100vh', paddingTop: '5rem', paddingBottom: '4rem' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="label-caps mb-3" style={{ color: colors.gold }}>Rankings</div>
          <h1
            style={{
              fontFamily: fonts.serif,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: colors.navyDark,
              marginBottom: '0.5rem',
            }}
          >
            Leaderboards
          </h1>
          <p style={{ fontFamily: fonts.sans, fontSize: '1rem', color: colors.gray600 }}>
            Rankings and achievements across the world of fishing records.
          </p>
        </div>

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
            borderRadius: '8px',
          }}
        >
          <h2 style={{ fontFamily: fonts.serif, fontSize: '2rem', fontWeight: 700, color: colors.white, marginBottom: '2rem' }}>
            By The Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: records.length.toLocaleString(), label: 'Total Records' },
              { num: '104', label: 'Countries' },
              { num: topAnglers.length, label: 'Record Holders' },
              { num: '1932', label: 'Earliest Record' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontFamily: fonts.serif, fontSize: '2rem', fontWeight: 700, color: colors.white }}>{stat.num}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
