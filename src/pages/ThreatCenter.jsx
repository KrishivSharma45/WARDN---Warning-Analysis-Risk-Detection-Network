import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, ChevronRight } from 'lucide-react'
import { fetchThreats } from '../api/scamShieldApi'
import RiskBadge from '../components/ui/RiskBadge'

const severityColor = {
  safe:       '#22C55E',
  suspicious: '#D97706',
  high:       '#EA580C',
  critical:   '#DC2626',
}

function StatBlock({ count, label, color }) {
  return (
    <div className="card card-hover" style={{ padding: '22px 24px', flex: 1, minWidth: 150 }}>
      <div style={{ fontSize: 34, fontWeight: 900, color, letterSpacing: '-0.04em', marginBottom: 4, lineHeight: 1 }}>{count}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{label}</div>
    </div>
  )
}

export default function ThreatCenter() {
  const navigate = useNavigate()
  const [threats, setThreats] = useState([])
  const [loading, setLoading] = useState(true)
  const [backendError, setBackendError] = useState(false)

  useEffect(() => {
    async function loadThreats() {
      setLoading(true)
      const data = await fetchThreats()
      if (data) {
        setThreats(data)
        setBackendError(false)
      } else {
        setThreats([])
        setBackendError(true)
      }
      setLoading(false)
    }
    loadThreats()
  }, [])

  const critical = threats.filter(e => e.severity === 'critical')
  const high = threats.filter(e => e.severity === 'high')
  const suspicious = threats.filter(e => e.severity === 'suspicious')

  return (
    <div className="animate-fadeIn" style={{ maxWidth: 960 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 6 }}>
          Threat Center
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>
          Detailed intelligence feed for all flagged risk vectors
        </p>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
        <StatBlock count={critical.length} label="Critical Risk" color="#DC2626" />
        <StatBlock count={high.length} label="High Risk" color="#EA580C" />
        <StatBlock count={suspicious.length} label="Suspicious" color="#D97706" />
        <StatBlock count={threats.length} label="Total Flagged" color="var(--text-primary)" />
      </div>

      {backendError && (
        <div className="card" style={{
          padding: '12px 16px', marginBottom: 18,
          borderColor: '#FCA5A5', background: '#FEF2F2', color: '#991B1B',
          fontSize: 13, fontWeight: 600
        }}>
          The security API is currently unavailable. Start FastAPI on port 8000 to load live threat data.
        </div>
      )}

      <div className="card" style={{ padding: 0, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', background: 'var(--card)' }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--text-primary)' }}>Threat Feed</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>Live data from the ScamShield security engine</div>
        </div>

        {loading ? (
          <div style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Loading threat intelligence…
          </div>
        ) : threats.length === 0 ? (
          <div style={{ padding: '36px 24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No active threats detected.
          </div>
        ) : (
          threats.map((email, i) => {
            const sev = email.severity || 'suspicious'
            const iconColor = severityColor[sev] || '#D97706'

            return (
              <div
                key={email.id}
                onClick={() => navigate(`/analysis/${email.id}`)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '16px 24px',
                  borderBottom: i < threats.length - 1 ? '1px solid var(--border-light)' : 'none',
                  cursor: 'pointer',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-light)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 'var(--radius-sm)',
                  background: `${iconColor}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <AlertTriangle size={19} color={iconColor} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {email.subject}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    {email.email} · <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{email.category}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <RiskBadge severity={email.severity} />
                  <span style={{ fontSize: 13, fontWeight: 800, color: iconColor }}>
                    {email.riskScore}/100
                  </span>
                </div>

                <ChevronRight size={17} color="var(--text-tertiary)" />
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
