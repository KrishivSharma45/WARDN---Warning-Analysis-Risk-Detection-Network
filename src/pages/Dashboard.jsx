import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Mail, AlertTriangle, CheckCircle, ChevronRight } from 'lucide-react'
import { demoEmails, threatStats as localThreatStats } from '../data/demoData'
import { fetchStats, fetchEmails } from '../api/scamShieldApi'
import RiskBadge from '../components/ui/RiskBadge'
import ScoreRing from '../components/ui/ScoreRing'

const severityColor = {
  safe:       '#22C55E',
  suspicious: '#D97706',
  high:       '#EA580C',
  critical:   '#DC2626',
}

function MetricCard({ value, label, sub, icon: Icon, iconBg, iconColor }) {
  return (
    <div className="card card-hover" style={{ padding: '20px 22px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
      <div style={{
        width: 42, height: 42, borderRadius: 'var(--radius-md)',
        background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        border: '1px solid rgba(23,35,29,0.06)'
      }}>
        <Icon size={19} color={iconColor} />
      </div>
      <div>
        <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.1, letterSpacing: '-0.03em' }}>{value}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginTop: 3 }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(localThreatStats)
  const [recentThreats, setRecentThreats] = useState(demoEmails.filter(e => e.severity !== 'safe').slice(0, 3))

  useEffect(() => {
    async function loadData() {
      const statsData = await fetchStats()
      if (statsData) {
        setStats({
          protectionScore: statsData.protection_score,
          emailsScanned: statsData.emails_scanned,
          suspicious: statsData.suspicious_count,
          threatsDetected: statsData.threats_detected
        })
      }
      const apiEmails = await fetchEmails()
      if (apiEmails && apiEmails.length > 0) {
        const threatsOnly = apiEmails.filter(e => e.severity !== 'safe').slice(0, 3)
        if (threatsOnly.length > 0) setRecentThreats(threatsOnly)
      }
    }
    loadData()
  }, [])

  return (
    <div className="animate-fadeIn" style={{ maxWidth: 1080 }}>
      {/* Header Banner */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-dark)' }} className="animate-pulse-dot" />
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-dark)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Protection Active</span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 6 }}>
          Security Overview
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>
          Your inbox is guarded in real time against phishing, scams, and domain spoofing.
        </p>
      </div>

      {/* Score & Key Metrics Row */}
      <div style={{ display: 'flex', gap: 20, marginBottom: 28, flexWrap: 'wrap' }}>
        {/* Main Score Ring Card */}
        <div className="card card-hover" style={{
          padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 28, minWidth: 300,
          background: 'var(--card)', borderColor: 'var(--border)'
        }}>
          <ScoreRing score={stats.protectionScore} severity="safe" size={114} strokeWidth={9} />
          <div>
            <div className="section-label" style={{ marginBottom: 6 }}>Protection Score</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent-dark)', marginBottom: 4 }}>{stats.protectionScore} / 100</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4 }}>High security health across all active email channels.</div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, minWidth: 280 }}>
          <MetricCard
            value={stats.emailsScanned.toLocaleString()}
            label="Emails Scanned"
            sub="Continuous monitoring"
            icon={Mail}
            iconBg="var(--accent-light)"
            iconColor="var(--accent-dark)"
          />
          <MetricCard
            value={stats.suspicious}
            label="Suspicious"
            sub="Flagged for inspection"
            icon={AlertTriangle}
            iconBg="#FEF3C7"
            iconColor="#92400E"
          />
          <MetricCard
            value={stats.threatsDetected}
            label="Threats Neutralized"
            sub="Phishing & scams"
            icon={Shield}
            iconBg="#FEE2E2"
            iconColor="#991B1B"
          />
          <MetricCard
            value="100%"
            label="Guard Uptime"
            sub="Zero security downtime"
            icon={CheckCircle}
            iconBg="var(--accent-light)"
            iconColor="var(--accent-dark)"
          />
        </div>
      </div>

      {/* Recent Threats Table / Feed */}
      <div className="card" style={{ padding: 24, boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid var(--border-light)' }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>Recent Threats Detected</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>High risk signals flagged in your inbox</div>
          </div>
          <button
            onClick={() => navigate('/inbox')}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              fontSize: 13, fontWeight: 700, color: 'var(--accent-dark)',
              background: 'none', border: 'none', cursor: 'pointer'
            }}
          >
            View all inbox <ChevronRight size={15} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {recentThreats.map((email) => (
            <div
              key={email.id}
              onClick={() => navigate(`/analysis/${email.id}`)}
              style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                border: '1px solid transparent',
                transition: 'all 0.18s'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-light)'; e.currentTarget.style.borderColor = 'var(--accent-mid)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent' }}
            >
              <div style={{
                width: 38, height: 38, borderRadius: 'var(--radius-sm)',
                background: `${severityColor[email.severity] || '#D97706'}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <AlertTriangle size={18} color={severityColor[email.severity] || '#D97706'} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {email.subject}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{email.email}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                <RiskBadge severity={email.severity} />
                <span style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600 }}>{email.riskScore}/100</span>
              </div>

              <ChevronRight size={16} color="var(--text-tertiary)" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
