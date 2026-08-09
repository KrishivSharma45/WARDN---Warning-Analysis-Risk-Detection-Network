import { useNavigate, Link } from 'react-router-dom'
import { Shield, ArrowRight, Check, Mail, AlertTriangle, ExternalLink, ChevronRight, Briefcase, CreditCard, User, Link2, Lock, Eye, Sparkles, ShieldCheck } from 'lucide-react'

const threatTypes = [
  { icon: Mail,          label: 'Phishing',         desc: 'Credential theft via impersonation' },
  { icon: Briefcase,     label: 'Job Scams',         desc: 'Fraudulent employment offers' },
  { icon: CreditCard,    label: 'Payment Scams',     desc: 'Fake transaction alerts' },
  { icon: User,          label: 'Impersonation',     desc: 'Spoofed sender identity' },
  { icon: Link2,         label: 'Suspicious Links',  desc: 'Malicious URL detection' },
  { icon: Lock,          label: 'Account Takeover',  desc: 'Unauthorized access attempts' },
]

/* Refined Abstract Cybersecurity Background Illustration */
function AbstractHeroIllustration() {
  return (
    <div style={{
      position: 'absolute',
      right: '-5%',
      top: '-5%',
      width: '65%',
      height: '110%',
      pointerEvents: 'none',
      opacity: 0.45,
      zIndex: 0,
      overflow: 'hidden'
    }}>
      <svg width="100%" height="100%" viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Subtle grid network lines */}
        <path d="M50 150H650M50 300H650M50 450H650M50 600H650" stroke="#78A98E" strokeWidth="1" strokeDasharray="4 8" opacity="0.4" />
        <path d="M150 50V650M300 50V650M450 50V650M600 50V650" stroke="#78A98E" strokeWidth="1" strokeDasharray="4 8" opacity="0.4" />
        
        {/* Abstract connection nodes */}
        <circle cx="300" cy="150" r="4" fill="#78A98E" opacity="0.6" />
        <circle cx="450" cy="300" r="5" fill="#3D7A5C" opacity="0.7" />
        <circle cx="150" cy="450" r="4" fill="#78A98E" opacity="0.6" />
        <circle cx="600" cy="300" r="4" fill="#78A98E" opacity="0.5" />
        
        {/* Concentric security shield orbits */}
        <circle cx="420" cy="320" r="220" stroke="#78A98E" strokeWidth="1.5" opacity="0.25" strokeDasharray="6 12" />
        <circle cx="420" cy="320" r="160" stroke="#3D7A5C" strokeWidth="1.5" opacity="0.3" />
        <circle cx="420" cy="320" r="100" stroke="#78A98E" strokeWidth="1" opacity="0.35" />

        {/* Abstract Floating Envelope / Security Shapes */}
        <g opacity="0.25" transform="translate(260, 140) rotate(-6)">
          <rect x="0" y="0" width="180" height="120" rx="16" fill="white" stroke="#78A98E" strokeWidth="2" />
          <path d="M10 20L90 75L170 20" stroke="#78A98E" strokeWidth="2" strokeLinecap="round" />
        </g>

        <g opacity="0.35" transform="translate(350, 220) rotate(4)">
          <path d="M80 20C80 20 140 40 140 100C140 170 80 210 80 210C80 210 20 170 20 100C20 40 80 20 80 20Z" fill="white" stroke="#3D7A5C" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  )
}

function HeroCard() {
  return (
    <div style={{
      background: 'var(--card)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-lg)',
      padding: 28,
      width: 360,
      position: 'relative',
      zIndex: 2,
      animation: 'float 5s ease-in-out infinite',
      backdropFilter: 'blur(8px)',
      backgroundGradient: 'linear-gradient(180deg, #FFFDFC 0%, #F9F7F2 100%)'
    }}>
      {/* Top Tag & Status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #FCA5A5' }}>
            <Shield size={18} color="#DC2626" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Security Analysis</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Live Gmail Guard</div>
          </div>
        </div>
        <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500, background: 'var(--accent-light)', padding: '3px 8px', borderRadius: 100 }}>Just now</span>
      </div>

      {/* Main Score Display */}
      <div style={{
        background: '#FEF2F2',
        borderRadius: 'var(--radius-md)',
        padding: '20px 16px',
        textAlign: 'center',
        marginBottom: 20,
        border: '1px solid #FCA5A5'
      }}>
        <div style={{ fontSize: 44, fontWeight: 900, color: '#DC2626', letterSpacing: '-0.04em', lineHeight: 1 }}>91<span style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-secondary)' }}>/100</span></div>
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 4 }}>Risk Rating</div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          background: '#DC2626', color: 'white',
          padding: '4px 12px', borderRadius: 100,
          fontSize: 11, fontWeight: 700, marginTop: 10,
          letterSpacing: '0.05em'
        }}>
          <AlertTriangle size={12} /> CRITICAL RISK
        </div>
      </div>

      {/* Category */}
      <div style={{
        background: 'var(--accent-light)', borderRadius: 'var(--radius-sm)', padding: '10px 14px',
        marginBottom: 18, border: '1px solid var(--accent-mid)', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-dark)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Category</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Possible Job Scam</div>
        </div>
        <Sparkles size={16} color="var(--accent-dark)" />
      </div>

      {/* Flags */}
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        Key Threat Signals
      </div>
      {[
        'Upfront payment requested',
        'Suspicious sender domain',
        'Artificial urgency detected',
      ].map((flag, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '8px 0',
          borderBottom: i < 2 ? '1px solid var(--border-light)' : 'none',
          fontSize: 13, color: 'var(--text-primary)', fontWeight: 500
        }}>
          <span style={{ color: '#DC2626', fontSize: 13 }}>🚩</span>
          {flag}
        </div>
      ))}
    </div>
  )
}

function AIChatPreview() {
  return (
    <div style={{
      background: 'var(--card)', borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-md)',
      padding: 28, width: 380
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--accent-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={18} color="white" />
        </div>
        <div>
          <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>ScamShield AI Assistant</span>
          <div style={{ fontSize: 11, color: 'var(--accent-dark)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-dark)' }} /> Security Agent Active
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="chat-bubble-user" style={{ fontSize: 13 }}>
          "Is this job offer real?"
        </div>
        <div className="chat-bubble-ai" style={{ fontSize: 13 }}>
          <strong style={{ color: '#DC2626' }}>High probability of fraud.</strong> The message requests payment before hiring and contains suspicious sender signals.
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', position: 'relative', overflowX: 'hidden' }} className="dot-bg">
      {/* Navbar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(247,244,237,0.9)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 48px',
        display: 'flex', alignItems: 'center',
        height: 70
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--accent-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={18} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>ScamShield</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['Product', 'How it works', 'Security'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} style={{
              fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)',
              textDecoration: 'none', transition: 'color 0.15s'
            }}
              onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
            >
              {item}
            </a>
          ))}
          <button className="btn-primary" onClick={() => navigate('/connect')} style={{ padding: '9px 20px', fontSize: 13 }}>
            Connect Gmail <ArrowRight size={15} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '90px 48px 100px', maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        <AbstractHeroIllustration />

        <div style={{ display: 'flex', alignItems: 'center', gap: 60, flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
          {/* Left Hero Content */}
          <div style={{ flex: 1, minWidth: 340 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--accent-light)', color: 'var(--accent-dark)',
              borderRadius: 100, padding: '6px 16px',
              fontSize: 12, fontWeight: 700, letterSpacing: '0.06em',
              marginBottom: 28, border: '1px solid var(--accent-mid)'
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-dark)' }} />
              AI EMAIL SECURITY FOR GMAIL
            </div>

            <h1 style={{
              fontSize: 'clamp(40px, 5.5vw, 62px)',
              fontWeight: 900, lineHeight: 1.08,
              letterSpacing: '-0.04em',
              color: 'var(--text-primary)',
              marginBottom: 24
            }}>
              Your inbox.<br />
              <span style={{ color: 'var(--accent-dark)' }}>Your first line<br />of defense.</span>
            </h1>

            <p style={{
              fontSize: 17, lineHeight: 1.7,
              color: 'var(--text-secondary)',
              maxWidth: 480, marginBottom: 36
            }}>
              ScamShield analyzes incoming emails for phishing, scams and social engineering — and explains the risk before you interact with them.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
              <button className="btn-primary" onClick={() => navigate('/connect')} style={{ padding: '13px 26px', fontSize: 15 }}>
                Connect Gmail — Free <ArrowRight size={17} />
              </button>
              <a href="#how-it-works" className="btn-secondary" style={{ padding: '13px 26px', fontSize: 15 }}>
                See how it works
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
              <ShieldCheck size={16} color="var(--accent-dark)" />
              Read-only access. ScamShield never sends or modifies email on your behalf.
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div style={{ flex: 1, minWidth: 320, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <HeroCard />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ padding: '90px 48px', borderTop: '1px solid var(--border)', background: 'var(--card)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>HOW IT WORKS</div>
            <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
              Three steps to a safer inbox
            </h2>
          </div>

          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {[
              { num: '01', title: 'Connect', desc: 'Connect Gmail using read-only access. No passwords stored, no emails sent.' },
              { num: '02', title: 'Analyze', desc: 'AI analyzes sender reputation, content patterns, links, and behavioral signals.' },
              { num: '03', title: 'Act', desc: 'Receive a risk score, plain-language explanation and recommended actions.' },
            ].map(({ num, title, desc }) => (
              <div key={num} className="card card-hover" style={{ flex: 1, minWidth: 260, padding: 36, background: 'var(--bg)' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--accent-dark)', letterSpacing: '0.04em', marginBottom: 18 }}>{num}</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12, letterSpacing: '-0.02em' }}>{title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Threat Coverage */}
      <section id="product" style={{ padding: '90px 48px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label" style={{ marginBottom: 12 }}>THREAT COVERAGE</div>
          <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
            Detect every type of email threat
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {threatTypes.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="card card-hover" style={{ padding: 28 }}>
              <div style={{
                width: 46, height: 46, borderRadius: 'var(--radius-md)',
                background: 'var(--accent-light)', border: '1px solid var(--accent-mid)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 18
              }}>
                <Icon size={22} color="var(--accent-dark)" />
              </div>
              <div style={{ fontWeight: 700, fontSize: 17, color: 'var(--text-primary)', marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Section */}
      <section id="security" style={{ padding: '90px 48px', background: 'var(--card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 60, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 300 }}>
            <div className="section-label" style={{ marginBottom: 16 }}>ASK SCAMSHIELD AI</div>
            <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 20, color: 'var(--text-primary)' }}>
              Get instant answers about any email
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 32 }}>
              Ask ScamShield AI anything about a suspicious email. Get plain-language explanations with specific risk details, not just a score.
            </p>
            <button className="btn-primary" onClick={() => navigate('/connect')} style={{ padding: '12px 24px' }}>
              Try it free <ArrowRight size={16} />
            </button>
          </div>
          <div style={{ flex: 1, minWidth: 300, display: 'flex', justifyContent: 'center' }}>
            <AIChatPreview />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 48px', textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
        <div className="section-label" style={{ marginBottom: 16 }}>GET STARTED FREE</div>
        <h2 style={{ fontSize: 42, fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 18, color: 'var(--text-primary)' }}>
          Protect your inbox today
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 36 }}>
          One-click prototype connection. Read-only product design. No email is sent or modified by ScamShield.
        </p>
        <button className="btn-primary" onClick={() => navigate('/connect')} style={{ fontSize: 16, padding: '14px 34px' }}>
          Connect Gmail — Free <ArrowRight size={18} />
        </button>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--accent-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={14} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-primary)' }}>ScamShield</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          © 2026 ScamShield AI. Prototype mode — local email analysis data is stored in SQLite.
        </div>
      </footer>
    </div>
  )
}
