import { useNavigate } from 'react-router-dom'
import RiskBadge from './RiskBadge'

const severityDot = {
  safe:       '#22C55E',
  suspicious: '#D97706',
  high:       '#EA580C',
  critical:   '#DC2626',
}

export default function EmailCard({ email, compact = false }) {
  const navigate = useNavigate()
  const dotColor = severityDot[email.severity] || '#D97706'

  return (
    <div
      className="card card-hover"
      onClick={() => navigate(`/analysis/${email.id}`)}
      style={{
        padding: compact ? '14px 18px' : '18px 22px',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 16,
        opacity: email.read ? 0.88 : 1,
        borderRadius: 'var(--radius-md)'
      }}
    >
      {/* Indicator Dot */}
      <div style={{
        width: 10, height: 10, borderRadius: '50%',
        background: dotColor, flexShrink: 0,
        boxShadow: `0 0 0 3px ${dotColor}25`
      }} />

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <span style={{ fontWeight: email.read ? 500 : 800, fontSize: 14, color: 'var(--text-primary)' }}>
            {email.sender}
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{email.email}</span>
        </div>
        <div style={{ fontWeight: email.read ? 400 : 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {email.subject}
        </div>
        {!compact && (
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {email.preview}
          </div>
        )}
      </div>

      {/* Right Details */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
        <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{email.time || email.date}</span>
        <RiskBadge severity={email.severity} />
        <span style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 700 }}>{email.riskScore}/100</span>
      </div>
    </div>
  )
}
