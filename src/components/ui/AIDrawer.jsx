import { useState, useRef, useEffect } from 'react'
import { X, Send, Shield, Sparkles } from 'lucide-react'
import { aiSuggestions, aiResponses } from '../../data/demoData'
import { askAIAssistant } from '../../api/WardnApi'

export default function AIDrawer({ onClose, emailContext }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: `I'm Wardn. I've analyzed this email and detected multiple risk indicators. What would you like to know?` }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text) => {
    const q = text || input.trim()
    if (!q) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: q }])
    setLoading(true)

    // Call API assistant endpoint
    const apiAnswer = await askAIAssistant(q, emailContext ? emailContext.id : null)

    setTimeout(() => {
      const response = apiAnswer || aiResponses[q] || aiResponses['default']
      setMessages(prev => [...prev, { role: 'ai', text: response }])
      setLoading(false)
    }, 400)
  }

  return (
    <>
      <div className="ai-drawer-overlay" onClick={onClose} />
      <div className="ai-drawer">
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'var(--card)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 'var(--radius-md)',
              background: 'var(--accent-dark)', display: 'flex',
              alignItems: 'center', justifyContent: 'center'
            }}>
              <Shield size={18} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-primary)' }}>Wardn</div>
              <div style={{ fontSize: 11, color: 'var(--accent-dark)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Sparkles size={11} /> Context Aware Security Agent
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: 'var(--text-tertiary)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Suggested Questions */}
        {messages.length <= 1 && (
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-light)', background: 'var(--bg)' }}>
            <div className="section-label" style={{ marginBottom: 10 }}>Suggested Prompts</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {aiSuggestions.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  style={{
                    padding: '7px 13px', borderRadius: 100,
                    border: '1px solid var(--border)',
                    background: 'var(--card)', cursor: 'pointer',
                    fontSize: 12, fontWeight: 500,
                    color: 'var(--text-primary)',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={e => { e.target.style.borderColor = 'var(--accent-dark)'; e.target.style.color = 'var(--accent-dark)' }}
                  onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-primary)' }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Feed */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 14, background: 'var(--bg)' }}>
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="chat-bubble-ai" style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--accent-dark)',
                  animation: `spin 1s ease-in-out ${i * 0.2}s infinite alternate`
                }} />
              ))}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', background: 'var(--card)' }}>
          <div style={{
            display: 'flex', gap: 8,
            background: 'var(--bg)', borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)', padding: '8px 8px 8px 14px'
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask anything about this email threat..."
              style={{
                flex: 1, border: 'none', background: 'none',
                fontSize: 14, outline: 'none',
                color: 'var(--text-primary)', fontFamily: 'inherit'
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim()}
              style={{
                width: 36, height: 36, borderRadius: 'var(--radius-sm)',
                background: input.trim() ? 'var(--accent-dark)' : 'var(--border)',
                border: 'none', cursor: input.trim() ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s', flexShrink: 0
              }}
            >
              <Send size={15} color={input.trim() ? 'white' : 'var(--text-tertiary)'} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
