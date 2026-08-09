import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { reportData as localReportData } from '../data/demoData'
import { fetchStats } from '../api/scamShieldApi'
import ScoreRing from '../components/ui/ScoreRing'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)', padding: '10px 14px',
        boxShadow: 'var(--shadow-md)', fontSize: 13
      }}>
        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{payload[0].name}</div>
        <div style={{ color: payload[0].fill || 'var(--accent-dark)', fontWeight: 600 }}>{payload[0].value}</div>
      </div>
    )
  }
  return null
}

function StatCard({ value, label, suffix = '' }) {
  return (
    <div className="card card-hover" style={{ padding: 24, textAlign: 'center' }}>
      <div style={{ fontSize: 36, fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.04em', lineHeight: 1 }}>
        {value}<span style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-secondary)' }}>{suffix}</span>
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6, fontWeight: 600 }}>{label}</div>
    </div>
  )
}

export default function Reports() {
  const [reportData, setReportData] = useState(localReportData)

  useEffect(() => {
    async function loadReports() {
      const stats = await fetchStats()
      if (stats) {
        setReportData(prev => ({
          ...prev,
          emailsAnalyzed: stats.emails_scanned,
          threatsDetected: stats.threats_detected,
          protectionScore: stats.protection_score,
          averageRisk: stats.average_risk_score ?? prev.averageRisk,
          breakdown: stats.category_breakdown && stats.category_breakdown.length > 0 ? stats.category_breakdown : prev.breakdown
        }))
      }
    }
    loadReports()
  }, [])

  return (
    <div className="animate-fadeIn" style={{ maxWidth: 1000 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 6 }}>Reports</h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>Email threat intelligence and security performance trends</p>
      </div>

      {/* Stats Summary Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 16, marginBottom: 28 }}>
        <StatCard value={reportData.emailsAnalyzed} label="Emails Analyzed" />
        <StatCard value={reportData.threatsDetected} label="Threats Flagged" />
        <StatCard value={reportData.averageRisk} label="Avg Risk Score" suffix="%" />
        <StatCard value={reportData.protectionScore} label="Protection Health" suffix="%" />
      </div>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {/* Pie Chart Card */}
        <div className="card" style={{ flex: 1, minWidth: 300, padding: 28 }}>
          <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--text-primary)', marginBottom: 4 }}>Threat Category Distribution</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>Categorized by risk taxonomy</div>

          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={reportData.breakdown}
                cx="50%" cy="50%"
                outerRadius={85}
                innerRadius={42}
                dataKey="value"
                paddingAngle={4}
              >
                {reportData.breakdown.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
            {reportData.breakdown.map(item => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
                  <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 600 }}>{item.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: item.color }}>{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart Card */}
        <div className="card" style={{ flex: 1, minWidth: 300, padding: 28 }}>
          <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--text-primary)', marginBottom: 4 }}>Weekly Guard Activity</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>Safe emails vs detected threat vectors</div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={reportData.weeklyTrends} barSize={14} barGap={6}>
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--accent-light)' }} />
              <Bar dataKey="safe" name="Safe" fill="var(--accent-mid)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="threats" name="Threats" fill="#DC2626" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div style={{ display: 'flex', gap: 20, marginTop: 12 }}>
            {[{ color: 'var(--accent-mid)', label: 'Safe emails' }, { color: '#DC2626', label: 'Flagged threats' }].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
                <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
