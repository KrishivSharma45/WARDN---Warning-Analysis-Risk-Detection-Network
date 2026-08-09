import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Check, ShieldCheck } from 'lucide-react'
import { startGmailConnect, fetchGmailStatus } from '../api/scamShieldApi'

export default function ConnectPage({ onConnect }) {
  const navigate = useNavigate()
  const [state, setState] = useState('idle')

  const handleConnect = async () => {
    setState('loading')

    const result = await startGmailConnect()

    if (result.status === 'error') {
      setState('error')
      return
    }

    const startedAt = Date.now()

    const timer = setInterval(async () => {
      const status = await fetchGmailStatus()

      if (status.status === 'connected') {
        clearInterval(timer)
        setState('connected')

        setTimeout(() => {
          onConnect()
          navigate('/dashboard')
        }, 900)

      } else if (status.status === 'error') {
        clearInterval(timer)
        console.error('Gmail OAuth error:', status.message)
        setState('error')

      } else if (Date.now() - startedAt > 120000) {
        clearInterval(timer)
        setState('error')
      }
    }, 1500)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px'
      }}
      className="dot-bg"
    >
      <div
        style={{
          maxWidth: 1000,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 48,
          alignItems: 'center'
        }}
      >

        {/* LEFT COLUMN */}
        <div>

          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 24
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(61,122,92,0.25)'
              }}
            >
              <Shield size={24} color="white" />
            </div>

            <span
              style={{
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)'
              }}
            >
              ScamShield AI
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(32px, 4vw, 42px)',
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              marginBottom: 16
            }}
          >
            Your inbox deserves a{' '}
            <span style={{ color: 'var(--accent-dark)' }}>
              security layer.
            </span>
          </h1>

          <p
            style={{
              fontSize: 16,
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              marginBottom: 32
            }}
          >
            Connect to the ScamShield prototype in seconds. The current build
            uses seeded email data and the local security engine; real Gmail
            OAuth is the next integration step.
          </p>

          {/* Security Card */}
          <div
            className="card"
            style={{
              padding: '24px 28px',
              background: 'var(--accent-light)',
              borderColor: 'var(--accent-mid)',
              display: 'flex',
              alignItems: 'center',
              gap: 18
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 'var(--radius-md)',
                background: 'var(--card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--accent-mid)',
                flexShrink: 0
              }}
            >
              <ShieldCheck size={28} color="var(--accent-dark)" />
            </div>

            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  color: 'var(--text-primary)',
                  marginBottom: 2
                }}
              >
                Bank-Grade Isolation
              </div>

              <div
                style={{
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.4
                }}
              >
                The prototype never sends, deletes, or modifies email. Real
                Gmail read-only OAuth will be added in the production
                integration.
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div
          className="card animate-fadeIn"
          style={{
            padding: '44px 38px',
            boxShadow: 'var(--shadow-lg)',
            borderRadius: 'var(--radius-xl)'
          }}
        >

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-light)',
                border: '1px solid var(--accent-mid)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 14
              }}
            >
              <Shield size={24} color="var(--accent-dark)" />
            </div>

            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                marginBottom: 6
              }}
            >
              Connect your Gmail
            </h2>

            <p
              style={{
                fontSize: 14,
                color: 'var(--text-secondary)',
                lineHeight: 1.5
              }}
            >
              Give ScamShield read-only access to analyze incoming email.
            </p>
          </div>

          {/* Checklist */}
          <div
            style={{
              background: 'var(--bg)',
              borderRadius: 'var(--radius-md)',
              padding: '18px 20px',
              marginBottom: 28,
              border: '1px solid var(--border)'
            }}
          >
            {[
              'Analyze email content and sender signals',
              'Detect phishing, scams and suspicious links',
              'Never send, delete or modify your emails'
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  marginBottom: i < 2 ? 12 : 0
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: 'var(--accent-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 2
                  }}
                >
                  <Check size={11} color="var(--accent-dark)" />
                </div>

                <span
                  style={{
                    fontSize: 13.5,
                    color: 'var(--text-primary)',
                    fontWeight: 500,
                    lineHeight: 1.4
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* IDLE */}
          {state === 'idle' && (
            <button
              onClick={handleConnect}
              style={{
                width: '100%',
                padding: '14px',
                background: 'var(--card)',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                fontSize: 15,
                fontWeight: 600,
                color: 'var(--text-primary)',
                transition: 'all 0.2s',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>

              Continue with Google
            </button>
          )}

          {/* LOADING */}
          {state === 'loading' && (
            <div
              style={{
                width: '100%',
                padding: '14px',
                background: 'var(--accent-dark)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                fontSize: 15,
                fontWeight: 600,
                color: 'white'
              }}
            >
              <div className="spinner" />
              Connecting to Gmail...
            </div>
          )}

          {/* ERROR */}
          {state === 'error' && (
            <div
              style={{
                width: '100%',
                padding: '14px',
                background: '#FEF2F2',
                border: '1.5px solid #FCA5A5',
                borderRadius: 'var(--radius-md)',
                fontSize: 13,
                color: '#991B1B',
                lineHeight: 1.5
              }}
            >
              <strong>Google connection could not be completed.</strong>

              <div style={{ marginTop: 5 }}>
                Check that the backend is running and that{' '}
                <code>backend/credentials.json</code> has been added.
                Then try again.
              </div>

              <button
                onClick={() => setState('idle')}
                style={{
                  marginTop: 10,
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: '1px solid #FCA5A5',
                  background: 'white',
                  color: '#991B1B',
                  cursor: 'pointer',
                  fontWeight: 700
                }}
              >
                Try again
              </button>
            </div>
          )}

          {/* CONNECTED */}
          {state === 'connected' && (
            <div
              style={{
                width: '100%',
                padding: '14px',
                background: '#DCFCE7',
                border: '1.5px solid #22C55E',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                fontSize: 15,
                fontWeight: 600,
                color: '#15803D'
              }}
            >
              <Check size={18} />
              Gmail Connected! Redirecting...
            </div>
          )}

          <p
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: 'var(--text-tertiary)',
              marginTop: 22,
              lineHeight: 1.4
            }}
          >
            By connecting, you authorize ScamShield to read Gmail messages for
            security analysis. This local prototype analyzes imported inbox
            messages.
          </p>

        </div>
      </div>
    </div>
  )
}