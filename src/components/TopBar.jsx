import { useState } from 'react'
import { Search, Bell, User, LogOut, Wifi, WifiOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getActiveAlertsCount, getWebSocketStatus } from '../services/dummyData'

function TopBar() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const activeAlerts = getActiveAlertsCount()
  const wsStatus = getWebSocketStatus()

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    navigate('/login')
  }

  return (
    <header className="glass-strong border-b border-infra-border/50 px-8 py-5 flex items-center justify-between sticky top-0 z-30 backdrop-blur-xl">
      {/* Global Search */}
      <div className="flex-1 max-w-2xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search servers, services, alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-5 py-3 bg-infra-bg/80 backdrop-blur-sm border border-infra-border/50 rounded-xl 
                     text-white placeholder-infra-muted focus:outline-none focus:ring-2 
                     focus:ring-primary-500/50 focus:border-primary-500/50 transition-all
                     hover:border-infra-border shadow-lg"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-4 ml-6">
        {/* WebSocket Status */}
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl backdrop-blur-sm border transition-all ${
          wsStatus 
            ? 'bg-success/20 border-success/40 shadow-lg shadow-success/20' 
            : 'bg-infra-bg/80 border-infra-border/50'
        }`}>
          {wsStatus ? (
            <>
              <Wifi size={18} className="text-success animate-pulse" />
              <span className="text-sm font-semibold text-success">Live</span>
            </>
          ) : (
            <>
              <WifiOff size={18} className="text-infra-muted" />
              <span className="text-sm text-infra-muted">Offline</span>
            </>
          )}
        </div>

        {/* Alerts Badge */}
        <button
          onClick={() => {
            navigate('/alerts')
            setShowNotifications(false)
          }}
          className="relative p-3 rounded-xl hover:bg-infra-border/50 transition-all hover:scale-110 group"
        >
          <Bell size={22} className="text-infra-muted group-hover:text-critical transition-colors" />
          {activeAlerts > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-critical to-red-600 rounded-full 
                           flex items-center justify-center text-xs font-bold text-white alert-glow shadow-lg">
              {activeAlerts > 9 ? '9+' : activeAlerts}
            </span>
          )}
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-3 px-4 py-2 rounded-xl hover:bg-infra-border/50 transition-all hover:scale-105 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <User size={18} className="text-white" />
            </div>
            <div className="text-left hidden md:block">
              <p className="text-sm font-semibold text-white">Admin User</p>
              <p className="text-xs text-infra-muted">Admin</p>
            </div>
          </button>

          {showProfileMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 mt-3 w-56 glass-strong rounded-2xl border border-infra-border/50 
                            shadow-2xl z-50 overflow-hidden backdrop-blur-xl">
                <button
                  onClick={() => {
                    navigate('/profile')
                    setShowProfileMenu(false)
                  }}
                  className="w-full px-5 py-3 text-left hover:bg-infra-border/50 flex items-center space-x-3 transition-all group"
                >
                  <User size={18} className="text-infra-muted group-hover:text-primary-400 transition-colors" />
                  <span className="font-medium">Profile</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-5 py-3 text-left hover:bg-critical/20 flex items-center space-x-3 text-critical transition-all group"
                >
                  <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default TopBar
