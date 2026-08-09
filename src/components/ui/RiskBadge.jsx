const severityMap = {
  safe:       { label: 'Safe',      cls: 'badge-safe' },
  suspicious: { label: 'Suspicious',cls: 'badge-suspicious' },
  high:       { label: 'High Risk', cls: 'badge-high' },
  critical:   { label: 'Critical',  cls: 'badge-critical' },
}

export default function RiskBadge({ severity, score, showScore = false, size = 'sm' }) {
  const key = (severity || '').toLowerCase()
  const { label, cls } = severityMap[key] || severityMap.suspicious

  return (
    <span className={`badge ${cls}`} style={size === 'lg' ? { padding: '5px 14px', fontSize: 13 } : {}}>
      {showScore && score != null ? `${score} / 100` : label}
    </span>
  )
}
