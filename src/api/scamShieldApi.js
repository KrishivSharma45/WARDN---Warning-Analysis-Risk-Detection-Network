const API_BASE = 'http://127.0.0.1:8000/api'

async function getJson(url, options = {}) {
  const res = await fetch(url, options)
  if (!res.ok) throw new Error(`API request failed: ${res.status}`)
  return res.json()
}

export async function fetchHealth() {
  try {
    return await getJson(`${API_BASE}/health`)
  } catch (err) {
    console.warn('Backend unavailable:', err)
    return { status: 'offline' }
  }
}

export async function fetchStats() {
  try {
    return await getJson(`${API_BASE}/stats`)
  } catch (err) {
    console.warn('Could not load stats:', err)
    return null
  }
}

function mapEmail(e) {
  return {
    id: String(e.id),
    sender: e.sender_name || e.sender.split('@')[0],
    email: e.sender,
    subject: e.subject,
    preview: e.preview || e.body.slice(0, 100),
    time: e.received_at,
    date: e.received_at,
    riskScore: e.analysis ? e.analysis.risk_score : 5,
    category: e.analysis ? e.analysis.category : 'Safe',
    severity: e.analysis ? e.analysis.severity : 'safe',
    read: e.is_read,
    body: e.body,
    suspiciousLinks: [],
    flags: e.analysis
      ? e.analysis.threats.map(t => ({ label: t.type, detail: t.description }))
      : [],
    aiExplanation: e.analysis
      ? e.analysis.explanation
      : 'Passes safety checks.'
  }
}

export async function fetchEmails(severity = 'all', search = '') {
  try {
    const url = new URL(`${API_BASE}/emails`)
    if (severity && severity !== 'all') url.searchParams.append('severity', severity)
    if (search) url.searchParams.append('search', search)

    const data = await getJson(url.toString())
    return data.map(mapEmail)
  } catch (err) {
    console.warn('Could not load emails:', err)
    return null
  }
}

export async function fetchEmailById(id) {
  try {
    const data = await getJson(`${API_BASE}/emails/${id}`)
    return mapEmail(data)
  } catch (err) {
    console.warn('Could not load email:', err)
    return null
  }
}

export async function fetchThreats() {
  try {
    const data = await getJson(`${API_BASE}/threats`)
    return data.map(item => ({
      id: String(item.id),
      sender: item.sender,
      email: item.email,
      subject: item.subject,
      category: item.category,
      riskScore: item.risk_score,
      severity: item.severity,
      time: item.time,
      flagsCount: item.flags_count
    }))
  } catch (err) {
    console.warn('Could not load threats:', err)
    return null
  }
}

export async function askAIAssistant(question, emailId = null) {
  try {
    const data = await getJson(`${API_BASE}/assistant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        email_id: emailId ? Number(emailId) : null
      })
    })
    return data.answer
  } catch (err) {
    console.warn('Assistant API unavailable:', err)
    return null
  }
}

export async function analyzeEmail({ sender, senderName = '', subject, body }) {
  try {
    return await getJson(`${API_BASE}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender,
        sender_name: senderName,
        subject,
        body
      })
    })
  } catch (err) {
    console.warn('Email analysis failed:', err)
    return null
  }
}


export async function startGmailConnect() {
  try {
    return await getJson(`${API_BASE}/gmail/connect`, { method: 'POST' })
  } catch (err) {
    console.warn('Could not start Gmail connection:', err)
    return { status: 'error', message: err.message }
  }
}

export async function fetchGmailStatus() {
  try {
    return await getJson(`${API_BASE}/gmail/status`)
  } catch (err) {
    console.warn('Could not load Gmail status:', err)
    return { status: 'error', message: err.message }
  }
}

export async function syncGmail() {
  try {
    return await getJson(`${API_BASE}/gmail/sync`, { method: 'POST' })
  } catch (err) {
    console.warn('Could not sync Gmail:', err)
    return { status: 'error', message: err.message }
  }
}

export async function disconnectGmail() {
  try {
    return await getJson(`${API_BASE}/gmail/disconnect`, { method: 'POST' })
  } catch (err) {
    console.warn('Could not disconnect Gmail:', err)
    return { status: 'error', message: err.message }
  }
}
