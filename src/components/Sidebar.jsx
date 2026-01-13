import { NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Server, 
  AlertTriangle, 
  BarChart3, 
  Bell, 
  Users, 
  Settings, 
  Menu,
  X
} from 'lucide-react'

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', color: 'text-primary-400 bg-primary-500/20' },
  { path: '/servers', icon: Server, label: 'Servers', color: 'text-blue-400 bg-blue-500/20' },
  { path: '/alerts', icon: AlertTriangle, label: 'Alerts', color: 'text-critical bg-critical/20' },
  { path: '/metrics', icon: BarChart3, label: 'Metrics', color: 'text-purple-400 bg-purple-500/20' },
  { path: '/notifications', icon: Bell, label: 'Notifications', color: 'text-orange-400 bg-orange-500/20' },
  { path: '/users', icon: Users, label: 'Users & RBAC', color: 'text-green-400 bg-green-500/20' },
  { path: '/settings', icon: Settings, label: 'Settings', color: 'text-yellow-400 bg-yellow-500/20' },
]

function Sidebar({ collapsed, onToggle }) {
  const location = useLocation()

  return (
    <aside className={`
      fixed left-0 top-0 h-full bg-infra-surface/90 glass-strong border-r border-infra-border/50 z-20
      transition-all duration-300 ease-in-out backdrop-blur-xl
      ${collapsed ? 'w-20' : 'w-72'}
    `}>
      <div className="flex flex-col h-full">
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between p-5 border-b border-infra-border/50">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">IW</span>
              </div>
              <span className="font-heading font-bold text-xl text-white bg-gradient-to-r from-white to-infra-muted bg-clip-text text-transparent">InfraWatch</span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-2.5 rounded-xl hover:bg-infra-border/50 transition-all hover:scale-110"
          >
            {collapsed ? <Menu size={22} className="text-infra-muted" /> : <X size={22} className="text-infra-muted" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path || 
                (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group relative
                      ${isActive 
                        ? collapsed
                          ? 'bg-primary-500/30 text-white border border-primary-500/50'
                          : 'bg-primary-500/20 text-white border border-primary-500/40'
                        : 'text-infra-muted hover:bg-infra-border/50 hover:text-white'
                      }
                      ${collapsed ? 'justify-center px-3' : ''}
                    `}
                  >
                    {isActive && !collapsed && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-400 rounded-r-full" />
                    )}
                    {isActive && collapsed && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-400 rounded-r-full" />
                    )}
                    <div className={`p-2 rounded-xl transition-all ${
                      isActive 
                        ? collapsed
                          ? 'bg-primary-500/40'
                          : 'bg-primary-500/30'
                        : `${item.color} group-hover:scale-110`
                    }`}>
                      <Icon size={20} />
                    </div>
                    {!collapsed && <span className="font-semibold">{item.label}</span>}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        {!collapsed && (
          <div className="p-4 border-t border-infra-border/50 text-xs text-infra-muted">
            <p>InfraWatch v1.0.0</p>
            <p className="mt-1">Self-Hosted Monitoring</p>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
