import { useState } from 'react'
import { Mail, Briefcase, CreditCard, User, Link2, Lock, X, ChevronRight, ShieldCheck, AlertOctagon, Info } from 'lucide-react'
import { learnContent } from '../data/demoData'

const iconMap = {
  fish:        Mail,
  briefcase:   Briefcase,
  'credit-card': CreditCard,
  'user-x':    User,
  link:        Link2,
  lock:        Lock,
}

function LearnModal({ item, onClose }) {
  return (
    <>
      <div
        className="ai-drawer-overlay"
        onClick={onClose}
      />
      <div style={{
        position: 'fixed', inset: '6%', maxWidth: 700,
        margin: 'auto', height: 'fit-content', maxHeight: '88vh',
        background: 'var(--card)', borderRadius: 'var(--radius-xl)', zIndex: 101,
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border)',
        overflowY: 'auto', animation: 'fadeIn 0.25s cubic-bezier(0.16,1,0.3,1) forwards'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '24px 28px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, background: 'var(--card)', zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 'var(--radius-md)',
              background: 'var(--accent-light)', border: '1px solid var(--accent-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {(() => { const Icon = iconMap[item.icon] || Mail; return <Icon size={22} color="var(--accent-dark)" /> })()}
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 19, color: 'var(--text-primary)' }}>{item.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Security Threat Advisory</div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: 'var(--text-tertiary)' }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '28px' }}>
          {/* Overview */}
          <div style={{ marginBottom: 26 }}>
            <div className="section-label" style={{ marginBottom: 8 }}>TAXONOMY OVERVIEW</div>
            <p style={{ fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.7, margin: 0 }}>{item.whatItIs}</p>
          </div>

          {/* Warning Signals */}
          <div style={{ marginBottom: 26 }}>
            <div className="section-label" style={{ color: '#EA580C', marginBottom: 12 }}>RED FLAG SIGNALS</div>
            {item.warningSigns.map((sign, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '10px 0', borderBottom: i < item.warningSigns.length - 1 ? '1px solid var(--border-light)' : 'none'
              }}>
                <span style={{ color: '#EA580C', fontSize: 13, flexShrink: 0, marginTop: 1 }}>🚩</span>
                <span style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.5, fontWeight: 500 }}>{sign}</span>
              </div>
            ))}
          </div>

          {/* How to Protect */}
          <div style={{
            background: 'var(--accent-light)', borderRadius: 'var(--radius-md)',
            padding: '20px 22px', border: '1px solid var(--accent-mid)'
          }}>
            <div className="section-label" style={{ marginBottom: 12 }}>COUNTERMEASURES</div>
            {item.howToProtect.map((tip, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '7px 0' }}>
                <ShieldCheck size={16} color="var(--accent-dark)" style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.5, fontWeight: 500 }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default function Learn() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="animate-fadeIn" style={{ maxWidth: 960 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 6 }}>Security Knowledge Base</h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>Master threat vectors and learn AI defense strategies</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 20 }}>
        {learnContent.map(item => {
          const Icon = iconMap[item.icon] || Mail
          return (
            <div
              key={item.id}
              className="card card-hover"
              onClick={() => setSelected(item)}
              style={{ padding: 26, cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{
                width: 46, height: 46, borderRadius: 'var(--radius-md)',
                background: 'var(--accent-light)', border: '1px solid var(--accent-mid)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 18
              }}>
                <Icon size={22} color="var(--accent-dark)" />
              </div>
              <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--text-primary)', marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 20, flex: 1 }}>{item.description}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 700, color: 'var(--accent-dark)' }}>
                View Advisory <ChevronRight size={15} />
              </div>
            </div>
          )
        })}
      </div>

      {selected && <LearnModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
