import { useState } from 'react'
import { Server } from 'lucide-react'

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (username && password) {
        localStorage.setItem('isAuthenticated', 'true')
        setIsAuthenticated(true)
      } else {
        setError('Please enter username and password')
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div className="w-full max-w-md">
        <div className="glass rounded-2xl p-8 border border-infra-border shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center mb-4">
              <Server size={32} className="text-white" />
            </div>
            <h1 className="font-heading font-bold text-3xl text-white mb-2">InfraWatch</h1>
            <p className="text-infra-muted text-sm">Self-Hosted Infrastructure Monitoring</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-critical/20 border border-critical rounded-lg p-3 text-sm text-critical">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-infra-muted mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-infra-bg border border-infra-border rounded-lg 
                         text-white placeholder-infra-muted focus:outline-none focus:ring-2 
                         focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-infra-muted mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-infra-bg border border-infra-border rounded-lg 
                         text-white placeholder-infra-muted focus:outline-none focus:ring-2 
                         focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-infra-border" />
                <span className="text-sm text-infra-muted">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary-500 hover:text-primary-400">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium 
                     py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-infra-bg rounded-lg border border-infra-border">
            <p className="text-xs text-infra-muted text-center">
              Demo: Use any username/password to login
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
