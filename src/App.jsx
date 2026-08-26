import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import ConnectPage from './pages/ConnectPage'
import AppLayout from './components/layout/AppLayout'
import Dashboard from './pages/Dashboard'
import Inbox from './pages/Inbox'
import ThreatCenter from './pages/ThreatCenter'
import SecurityAnalysis from './pages/SecurityAnalysis'
import Reports from './pages/Reports'
import Learn from './pages/Learn'
import Settings from './pages/Settings'

export const AppContext = {
  connected: false,
  userEmail: 'user@gmail.com'
}

function App() {
  const [isConnected, setIsConnected] = useState(
    () => localStorage.getItem('wardn_connected') === 'true'
  )

  const connect = () => {
    localStorage.setItem('wardn_connected', 'true')
    setIsConnected(true)
  }

  const disconnect = () => {
    localStorage.removeItem('wardn_connected')
    setIsConnected(false)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/connect" element={<ConnectPage onConnect={connect} />} />
        <Route path="/dashboard" element={isConnected ? <AppLayout><Dashboard /></AppLayout> : <Navigate to="/connect" />} />
        <Route path="/inbox" element={isConnected ? <AppLayout><Inbox /></AppLayout> : <Navigate to="/connect" />} />
        <Route path="/threats" element={isConnected ? <AppLayout><ThreatCenter /></AppLayout> : <Navigate to="/connect" />} />
        <Route path="/analysis/:id" element={isConnected ? <AppLayout><SecurityAnalysis /></AppLayout> : <Navigate to="/connect" />} />
        <Route path="/reports" element={isConnected ? <AppLayout><Reports /></AppLayout> : <Navigate to="/connect" />} />
        <Route path="/learn" element={isConnected ? <AppLayout><Learn /></AppLayout> : <Navigate to="/connect" />} />
        <Route path="/settings" element={isConnected ? <AppLayout><Settings onDisconnect={disconnect} /></AppLayout> : <Navigate to="/connect" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
