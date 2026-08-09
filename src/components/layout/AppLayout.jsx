import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

export default function AppLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }} className="dot-bg">
      <Sidebar />
      <main className="app-main" style={{ padding: '32px 32px', minHeight: '100vh' }}>
        {children}
      </main>
      <MobileNav />
    </div>
  )
}
