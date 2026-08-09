import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Mail, AlertTriangle, BarChart2, BookOpen } from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/inbox',     icon: Mail,            label: 'Inbox' },
  { to: '/threats',   icon: AlertTriangle,   label: 'Threats' },
  { to: '/reports',   icon: BarChart2,       label: 'Reports' },
  { to: '/learn',     icon: BookOpen,        label: 'Learn' },
]

export default function MobileNav() {
  return (
    <nav className="mobile-nav">
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `mobile-nav-item${isActive ? ' active' : ''}`}
        >
          <Icon size={20} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
