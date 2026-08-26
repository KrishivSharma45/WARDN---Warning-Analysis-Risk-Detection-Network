import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield, AlertTriangle, ExternalLink, ChevronDown, ChevronUp, Sparkles, CheckCircle2, XCircle } from 'lucide-react'
import { demoEmails } from '../data/demoData'
import { fetchEmailById } from '../api/scamShieldApi'
import ScoreRing from '../components/ui/ScoreRing'
import RiskBadge from '../components/ui/RiskBadge'
import AIDrawer from '../components/ui/AIDrawer'

const severityLabel = {
  safe:       'Safe',
  suspicious: 'Suspicious',
  high:       'High Risk',
  critical:   'Critical',
}
const severityColor = {
  safe:       '#22C55E',
  suspicious: '#D97706',
  high:       '#EA580C',
  critical:   '#DC2626',
}

function FlagCard({ flag }) {
  const [open, setOpen] = useState(true)
  return (
    <div style={{
      border: '1px solid #FCA5A5', borderRadius: 'var(--radius-md)',
      overflow: 'hidden', marginBottom: 12, background: '#FEF2F2'
    }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '13px 16px', cursor: 'pointer',
          background: open ? '#FEE2E2' : '#FEF2F2',
          transition: 'background 0.15s'
        }}
      >
        <span style={{ fontSize: 16 }}>🚩</span>
        <span style={{ flex: 1, fontWeight: 700, fontSize: 14, color: '#991B1B' }}>{flag.label}</span>
        {open ? <ChevronUp size={16} color="#991B1B" /> : <ChevronDown size={16} color="#991B1B" />}
      </div>
      {open && (
        <div style={{ padding: '12px 16px 14px', background: '#FFF5F5', borderTop: '1px solid #FCA5A5' }}>
          <p style={{ fontSize: 13.5, color: '#7F1D1D', lineHeight: 1.6, margin: 0 }}>{flag.detail}</p>
        </div>
      )}
    </div>
  )
}

export default function SecurityAnalysis() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showAI, setShowAI] = useState(false)
  const [email, setEmail] = useState(demoEmails.find(e => e.id === id) || demoEmails[0])

  useEffect(() => {
    async function loadAnalysis() {
      if (id) {
        const apiEmail = await fetchEmailById(id)
        if (apiEmail) setEmail(apiEmail)
      }
    }
    loadAnalysis()
  }, [id])

  const color = severityColor[email.severity] || '#D97706'

  return (
    <div className="animate-fadeIn" style={{ maxWidth: 1120 }}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600,
          marginBottom: 24, padding: 0
        }}
      >
        <ArrowLeft size={16} /> Back to list
      </button>

      {/* Investigation Workbench Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24, alignItems: 'flex-start' }}>
        
        {/* LEFT COLUMN: Security Intelligence & Findings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Main Risk Score Card */}
          <div className="card" style={{ padding: 28, boxShadow: 'var(--shadow-md)', position: 'relative', overflow: 'hidden' }}>
            <div className="section-label" style={{ marginBottom: 20 }}>SECURITY INVESTIGATION REPORT</div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
              <ScoreRing score={email.riskScore} severity={email.severity} size={110} strokeWidth={10} />
              <div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: `${color}18`, color,
                  padding: '5px 14px', borderRadius: 100,
                  fontSize: 12, fontWeight: 800,
                  letterSpacing: '0.04em', marginBottom: 10
                }}>
                  <AlertTriangle size={13} />
                  {(severityLabel[email.severity] || email.severity).toUpperCase()}
                </div>
                <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                  {email.category}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                  Sender: <strong style={{ color: 'var(--text-primary)' }}>{email.sender}</strong>
                </div>
              </div>
            </div>

            {/* AI Explanation Box */}
            <div style={{
              background: 'var(--accent-light)', borderRadius: 'var(--radius-md)', padding: 18,
              border: '1px solid var(--accent-mid)', borderLeft: '4px solid var(--accent-dark)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800, color: 'var(--accent-dark)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                <Sparkles size={14} /> Wardn Intelligence Brief
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.7, margin: 0, fontWeight: 450 }}>
                {email.aiExplanation}
              </p>
            </div>
          </div>

          {/* Red Flags Section */}
          {email.flags && email.flags.length > 0 && (
            <div className="card" style={{ padding: 24 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>🚩</span> Detected Threat Indicators ({email.flags.length})
              </div>
              {email.flags.map((flag, i) => (
                <FlagCard key={i} flag={flag} />
              ))}
            </div>
          )}

          {/* Recommended Actions */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>
              Recommended Security Actions
            </div>

            {email.severity === 'safe' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, background: 'var(--accent-light)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-dark)', fontWeight: 600 }}>
                <CheckCircle2 size={18} />
                <span style={{ fontSize: 14 }}>This email passed all AI safety checks. No threat detected.</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  "Do not click any embedded links or CTA buttons",
                  "Do not enter passwords, credit card info, or OTP codes",
                  "Never send money or cryptocurrency upfront"
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#FEF2F2', borderRadius: 'var(--radius-sm)', border: '1px solid #FCA5A5' }}>
                    <XCircle size={16} color="#DC2626" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 13.5, color: '#991B1B', fontWeight: 600 }}>{item}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--accent-light)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-mid)', marginTop: 4 }}>
                  <CheckCircle2 size={16} color="var(--accent-dark)" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 13.5, color: 'var(--accent-dark)', fontWeight: 600 }}>Verify the claimed company using an independent browser lookup.</span>
                </div>
              </div>
            )}
          </div>

          {/* AI Drawer Trigger Button */}
          <button
            className="btn-primary"
            onClick={() => setShowAI(true)}
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 15 }}
          >
            <Shield size={18} />
            Ask Wardn About This Email
          </button>
        </div>

        {/* RIGHT COLUMN: Raw Email Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card" style={{ overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
            {/* Header bar */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
              <div className="section-label" style={{ marginBottom: 12 }}>EMBEDDED EMAIL PREVIEW</div>
              <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--text-primary)', marginBottom: 10 }}>
                {email.subject}
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 'var(--radius-sm)',
                  background: `${color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 15, fontWeight: 800, color, flexShrink: 0
                }}>
                  {email.sender[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{email.sender}</div>
                  <div style={{ fontSize: 12, color: color, fontWeight: 600, wordBreak: 'break-all' }}>
                    {'<'}{email.email}{'>'}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>Received: {email.time || email.date}</div>
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div style={{ padding: '24px' }}>
              <div style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {email.body.split('\n').map((line, i) => {
                  if (line.startsWith('[') && line.endsWith(']')) {
                    return (
                      <div key={i} style={{ margin: '16px 0' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            background: '#FEE2E2',
                            border: '1.5px solid #FCA5A5',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: 13.5, fontWeight: 700,
                            color: '#991B1B',
                            cursor: 'pointer'
                          }}
                        >
                          ⚠ {line} (Flagged Link)
                        </span>
                      </div>
                    )
                  }
                  return <div key={i}>{line || '\u00A0'}</div>
                })}
              </div>
            </div>

            {/* Warning Banner */}
            {email.severity !== 'safe' && (
              <div style={{
                margin: '0 24px 24px',
                background: '#FEF2F2',
                border: '1px solid #FCA5A5',
                borderRadius: 'var(--radius-md)', padding: '14px 16px',
                display: 'flex', gap: 12, alignItems: 'flex-start'
              }}>
                <AlertTriangle size={18} color="#DC2626" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#991B1B', marginBottom: 2 }}>Wardn Guard Warning</div>
                  <div style={{ fontSize: 12.5, color: '#7F1D1D', lineHeight: 1.5 }}>
                    This email exhibits active phishing signals. Interactions are logged and reported.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Assistant Drawer */}
      {showAI && <AIDrawer onClose={() => setShowAI(false)} emailContext={email} />}
    </div>
  )
}
