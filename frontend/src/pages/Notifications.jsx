import { useState } from 'react'
import { Mail, MessageSquare, Webhook, CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react'
import { getNotifications } from '../services/dummyData'
import { formatDistanceToNow } from 'date-fns'

function Notifications() {
  const [notifications, setNotifications] = useState(getNotifications())

  const getTypeIcon = (type) => {
    switch (type) {
      case 'email': return <div className="p-2 bg-blue-500/20 rounded-lg"><Mail size={20} className="text-blue-400" /></div>
      case 'slack': return <div className="p-2 bg-purple-500/20 rounded-lg"><MessageSquare size={20} className="text-purple-400" /></div>
      case 'webhook': return <div className="p-2 bg-green-500/20 rounded-lg"><Webhook size={20} className="text-green-400" /></div>
      default: return <div className="p-2 bg-blue-500/20 rounded-lg"><Mail size={20} className="text-blue-400" /></div>
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle size={18} className="text-success" />
      case 'failed': return <XCircle size={18} className="text-critical" />
      case 'pending': return <Clock size={18} className="text-warning" />
      default: return <Clock size={18} />
    }
  }

  const handleRetry = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, status: 'delivered', retries: 0 } : n
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl border border-orange-500/30">
            <Mail size={28} className="text-orange-400" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-3xl text-white mb-2">Notifications</h1>
            <p className="text-infra-muted">Monitor notification delivery status</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass rounded-xl p-6 border border-infra-border bg-gradient-to-br from-blue-500/10 to-blue-600/5 hover:shadow-xl transition-all">
          <div className="flex items-center space-x-2 mb-2">
            <Mail size={18} className="text-blue-400" />
            <div className="text-sm text-infra-muted">Total Notifications</div>
          </div>
          <div className="text-3xl font-bold text-white">{notifications.length}</div>
        </div>
        <div className="glass rounded-xl p-6 border border-infra-border bg-gradient-to-br from-success/20 to-green-600/10 hover:shadow-xl transition-all">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle size={18} className="text-success" />
            <div className="text-sm text-infra-muted">Delivered</div>
          </div>
          <div className="text-3xl font-bold text-success">
            {notifications.filter(n => n.status === 'delivered').length}
          </div>
        </div>
        <div className="glass rounded-xl p-6 border border-infra-border bg-gradient-to-br from-critical/20 to-red-600/10 hover:shadow-xl transition-all">
          <div className="flex items-center space-x-2 mb-2">
            <XCircle size={18} className="text-critical" />
            <div className="text-sm text-infra-muted">Failed</div>
          </div>
          <div className="text-3xl font-bold text-critical">
            {notifications.filter(n => n.status === 'failed').length}
          </div>
        </div>
        <div className="glass rounded-xl p-6 border border-infra-border bg-gradient-to-br from-warning/20 to-orange-600/10 hover:shadow-xl transition-all">
          <div className="flex items-center space-x-2 mb-2">
            <Clock size={18} className="text-warning" />
            <div className="text-sm text-infra-muted">Pending</div>
          </div>
          <div className="text-3xl font-bold text-warning">
            {notifications.filter(n => n.status === 'pending').length}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="glass rounded-xl border border-infra-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-infra-bg border-b border-infra-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-infra-muted uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-infra-muted uppercase">Recipient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-infra-muted uppercase">Alert</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-infra-muted uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-infra-muted uppercase">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-infra-muted uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-infra-border">
            {notifications.map((notification) => (
              <tr key={notification.id} className="hover:bg-infra-bg/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2 text-primary-500">
                    {getTypeIcon(notification.type)}
                    <span className="capitalize">{notification.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-white">
                  {notification.recipient}
                </td>
                <td className="px-6 py-4 text-white">
                  {notification.alert}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(notification.status)}
                    <span className={`text-sm capitalize ${
                      notification.status === 'delivered' ? 'text-success' :
                      notification.status === 'failed' ? 'text-critical' :
                      'text-warning'
                    }`}>
                      {notification.status}
                    </span>
                    {notification.retries > 0 && (
                      <span className="text-xs text-infra-muted">
                        ({notification.retries} retries)
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-infra-muted">
                  {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {notification.status === 'failed' && (
                    <button
                      onClick={() => handleRetry(notification.id)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-primary-600 hover:bg-primary-700 
                               text-white rounded-lg text-sm transition-colors"
                    >
                      <RefreshCw size={14} />
                      <span>Retry</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Notifications
