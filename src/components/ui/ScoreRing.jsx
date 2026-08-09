import { useEffect, useState } from 'react'

const colorMap = {
  safe:       '#22C55E',
  suspicious: '#EAB308',
  high:       '#F97316',
  critical:   '#EF4444',
}

export default function ScoreRing({ score, severity, size = 120, strokeWidth = 10 }) {
  const [animated, setAnimated] = useState(0)
  const color = colorMap[severity] || '#EAB308'
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animated / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(score), 200)
    return () => clearTimeout(timer)
  }, [score])

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="#F0EDE8" strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center'
      }}>
        <span style={{ fontSize: size * 0.22, fontWeight: 800, color, lineHeight: 1 }}>{score}</span>
        <span style={{ fontSize: size * 0.1, color: 'var(--text-secondary)', fontWeight: 500 }}>/ 100</span>
      </div>
    </div>
  )
}
