import { syncGmail, disconnectGmail } from '../api/scamShieldApi'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RefreshCw, LogOut, Shield, Lock, ShieldCheck } from 'lucide-react'

function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 44, height: 24, borderRadius: 12,
        background: checked ? 'var(--accent-dark)' : 'var(--border)',
        cursor: 'pointer', position: 'relative',
        transition: 'background 0.2s', flexShrink: 0
      }}
    >
      <div style={{
        position: 'absolute',
        top: 3, left: checked ? 23 : 3,
        width: 18, height: 18, borderRadius: '50%',
        background: 'white',
        boxShadow: 'var(--shadow-xs)',
        transition: 'left 0.2s'
      }} />
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="card" style={{ padding: 26, marginBottom: 20 }}>
      <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid var(--border-light)' }}>
        {title}
      </div>
      {children}
    </div>
  )
}

function SettingRow({ label, desc, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '12px 0', borderBottom: '1px solid var(--border-light)' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{label}</div>
        {desc && <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 2 }}>{desc}</div>}
      </div>
      {children}
    </div>
  )
}

export default function Settings({ onDisconnect }) {
  const navigate = useNavigate()
  const [autoAnalyze, setAutoAnalyze] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [synced, setSynced] = useState(false)
  const [syncMessage, setSyncMessage] = useState('')

  const handleSync = async () => {
    setSyncing(true)
    setSyncMessage('')
    const result = await syncGmail()
    setSyncMessage(result.message || 'Sync finished.')
    setSyncing(false)
    setSynced(result.status === 'connected')
    setTimeout(() => setSynced(false), 2500)
  }

  const handleDisconnect = async () => {
    await disconnectGmail()
    onDisconnect()
    navigate('/')
  }

  return (
    <div className="animate-fadeIn" style={{ maxWidth: 680 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 6 }}>Settings</h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>Manage your Wardn security settings</p>
      </div>

      {/* Gmail Account Connection */}
      <Section title="Gmail Connection">
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '16px 18px', background: 'var(--accent-light)',
          borderRadius: 'var(--radius-md)', marginBottom: 18,
          border: '1px solid var(--accent-mid)'
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-dark)' }} className="animate-pulse-dot" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--accent-dark)' }}>Gmail Active Connection</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>user@gmail.com</div>
          </div>
          <ShieldCheck size={20} color="var(--accent-dark)" />
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={handleSync}
            className="btn-secondary"
            style={{ flex: 1, justifyContent: 'center', fontSize: 13.5, padding: '11px' }}
          >
            {syncing ? (
              <><div className="spinner spinner-dark" /> Syncing Gmail...</>
            ) : synced ? (
              <><Shield size={16} color="var(--accent-dark)" /> Synced Clean!</>
            ) : (
              <><RefreshCw size={15} /> Force Sync Now</>
            )}
          </button>
          <button
            onClick={handleDisconnect}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '11px', borderRadius: 'var(--radius-md)',
              border: '1px solid #FCA5A5',
              background: '#FEF2F2', color: '#991B1B',
              fontSize: 13.5, fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            <LogOut size={15} /> Disconnect Gmail
          </button>
        </div>
        {syncMessage && (
          <div style={{ marginTop: 10, fontSize: 12.5, color: 'var(--text-secondary)' }}>
            {syncMessage}
          </div>
        )}
      </Section>

      {/* Protection Settings */}
      <Section title="Protection Preferences">
        <SettingRow
          label="Automatic Email Analysis"
          desc="Analyze all incoming Gmail messages as they land in inbox"
        >
          <Toggle checked={autoAnalyze} onChange={setAutoAnalyze} />
        </SettingRow>
        <SettingRow
          label="Threat Notifications"
          desc="Receive alerts when high or critical risk vectors are detected"
        >
          <Toggle checked={notifications} onChange={setNotifications} />
        </SettingRow>
      </Section>

      {/* Privacy Guarantee */}
      <Section title="Privacy & Security Guarantee">
        <div style={{
          background: 'var(--bg)', borderRadius: 'var(--radius-md)',
          padding: 18, marginBottom: 16,
          borderLeft: '4px solid var(--accent-dark)', border: '1px solid var(--border)'
        }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <Lock size={18} color="var(--accent-dark)" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
              This local prototype stores seeded and analyzed email records in SQLite so the dashboard, threat center, reports, and analysis pages can work end-to-end. Production Gmail mode should enforce a strict retention policy.
            </p>
          </div>
        </div>

        {[
          { label: 'Email body stored locally', value: 'Yes — prototype SQLite' },
          { label: 'Gmail OAuth scope', value: 'Planned — not connected yet' },
          { label: 'Emails modified or deleted', value: 'Never' },
          { label: 'Data retention policy', value: 'Local prototype database' },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{value}</span>
          </div>
        ))}
      </Section>
    </div>
  )
}
