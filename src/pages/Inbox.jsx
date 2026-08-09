import { useState, useEffect } from 'react'
import { Search, RefreshCw } from 'lucide-react'
import { fetchEmails, syncGmail } from '../api/scamShieldApi'
import EmailCard from '../components/ui/EmailCard'

const filters = [
  { label: 'All',       value: 'all' },
  { label: 'Safe',      value: 'safe' },
  { label: 'Suspicious',value: 'suspicious' },
  { label: 'High Risk', value: 'high' },
  { label: 'Critical',  value: 'critical' },
]

export default function Inbox() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [emails, setEmails] = useState([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    async function loadInbox() {
      setLoading(true)
      const data = await fetchEmails(activeFilter, search)
      if (data) {
        setEmails(data)
      } else {
        setEmails([])
      }
      setLoading(false)
    }
    loadInbox()
  }, [activeFilter, search])

  const filtered = emails
  const handleSync = async () => {
  setSyncing(true)

  await syncGmail()

  const data = await fetchEmails(activeFilter, search)
  setEmails(data || [])

  setSyncing(false)
}

  return (
    <div className="animate-fadeIn" style={{ maxWidth: 960 }}>
      {/* Header */}
      <div style={{
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 16,
  flexWrap: 'wrap'
}}>
  <div>
    <h1 style={{
      fontSize: 32,
      fontWeight: 900,
      letterSpacing: '-0.03em',
      color: 'var(--text-primary)',
      marginBottom: 6
    }}>
      Inbox
    </h1>

    <p style={{
      fontSize: 15,
      color: 'var(--text-secondary)'
    }}>
      {emails.length} emails analyzed — {emails.filter(e => e.severity !== 'safe').length} flagged for inspection
    </p>
  </div>

  <button
    onClick={handleSync}
    disabled={syncing}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 16px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--accent-mid)',
      background: 'var(--accent-light)',
      color: 'var(--accent-dark)',
      fontWeight: 700,
      cursor: syncing ? 'wait' : 'pointer'
    }}
  >
    <RefreshCw
      size={16}
      style={{
        animation: syncing ? 'spin 1s linear infinite' : 'none'
      }}
    />
    {syncing ? 'Syncing...' : 'Sync Gmail'}
  </button>
</div>

      {/* Search Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: 'var(--card)', borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
        padding: '12px 18px', marginBottom: 18,
        boxShadow: 'var(--shadow-xs)'
      }}>
        <Search size={18} color="var(--text-tertiary)" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by email subject, sender, domain, or threat tag..."
          style={{
            flex: 1, border: 'none', background: 'none',
            fontSize: 14, outline: 'none',
            color: 'var(--text-primary)', fontFamily: 'inherit'
          }}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', fontSize: 18, lineHeight: 1 }}
          >
            ×
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap' }}>
        {filters.map(f => {
          const count = f.value === 'all' 
            ? emails.length 
            : emails.filter(e => (e.severity || '').toLowerCase() === f.value).length

          return (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              style={{
                padding: '7px 18px', borderRadius: 100,
                border: '1px solid',
                borderColor: activeFilter === f.value ? 'var(--accent-dark)' : 'var(--border)',
                background: activeFilter === f.value ? 'var(--accent-light)' : 'var(--card)',
                color: activeFilter === f.value ? 'var(--accent-dark)' : 'var(--text-secondary)',
                fontSize: 13, fontWeight: activeFilter === f.value ? 700 : 500, cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {f.label}
              <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.75 }}>
                ({count})
              </span>
            </button>
          )
        })}
      </div>

      {/* Email List */}
      {loading ? (
        <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <div className="spinner spinner-dark" style={{ margin: '0 auto 12px' }} />
          Loading inbox from ScamShield Security API...
        </div>
      ) : filtered.length === 0 ? (
        <div className="card" style={{ padding: '54px 24px', textAlign: 'center' }}>
          <Search size={36} color="var(--text-tertiary)" style={{ marginBottom: 14 }} />
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>No matching emails found</div>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Try broadening your search term or active filter.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(email => (
            <EmailCard key={email.id} email={email} />
          ))}
        </div>
      )}
    </div>
  )
}
