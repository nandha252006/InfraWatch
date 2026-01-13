import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Servers from './pages/Servers'
import ServerDetail from './pages/ServerDetail'
import Alerts from './pages/Alerts'
import Metrics from './pages/Metrics'
import Notifications from './pages/Notifications'
import Users from './pages/Users'
import Settings from './pages/Settings'
import Profile from './pages/Profile'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  )

  useEffect(() => {
    // Check authentication on mount
    const auth = localStorage.getItem('isAuthenticated')
    setIsAuthenticated(auth === 'true')
  }, [])

  return (
    <ErrorBoundary>
      <div className="app-background">
        <Router>
          <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />
            } 
          />
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <Layout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/servers" element={<Servers />} />
                    <Route path="/servers/:id" element={<ServerDetail />} />
                    <Route path="/alerts" element={<Alerts />} />
                    <Route path="/metrics" element={<Metrics />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
    </ErrorBoundary>
  )
}

export default App
