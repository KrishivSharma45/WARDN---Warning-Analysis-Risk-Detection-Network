import { NavLink, useLocation } from 'react-router-dom'
import { Shield, LayoutDashboard, Mail, AlertTriangle, BarChart2, BookOpen, Settings, Wifi } from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/inbox',     icon: Mail,            label: 'Inbox' },
  { to: '/threats',   icon: AlertTriangle,   label: 'Threats' },
  { to: '/reports',   icon: BarChart2,       label: 'Reports' },
  { to: '/learn',     icon: BookOpen,        label: 'Learn' },
  { to: '/settings',  icon: Settings,        label: 'Settings' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 'var(--radius-md)',
            background: 'var(--accent-dark)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(61,122,92,0.25)'
          }}>
            <Shield size={19} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>ScamShield</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>AI Security</div>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer User Guard Badge */}
      <div style={{ padding: '16px', borderTop: '1px solid var(--border)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 14px', borderRadius: 'var(--radius-md)',
          background: 'var(--accent-light)',
          border: '1px solid var(--accent-mid)'
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--accent-dark)'
          }} className="animate-pulse-dot" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-dark)', letterSpacing: '0.01em' }}>Gmail Protected</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>user@gmail.com</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
