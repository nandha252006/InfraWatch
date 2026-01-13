import { useState } from 'react'
import { AlertTriangle, CheckCircle, BellOff, Filter, Clock, Server } from 'lucide-react'
import AlertBadge from '../components/AlertBadge'
import { getAlerts } from '../services/dummyData'
import { formatDistanceToNow } from 'date-fns'

function Alerts() {
  const [alerts, setAlerts] = useState(getAlerts())
  const [severityFilter, setSeverityFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredAlerts = alerts.filter(alert => {
    const severityMatch = severityFilter === 'all' || alert.severity === severityFilter
    const statusMatch = statusFilter === 'all' || 
      (statusFilter === 'active' && !alert.acknowledged && !alert.silenced) ||
      (statusFilter === 'acknowledged' && alert.acknowledged) ||
      (statusFilter === 'silenced' && alert.silenced)
    return severityMatch && statusMatch
  })

  const handleAcknowledge = (id) => {
    setAlerts(alerts.map(a => 
      a.id === id ? { ...a, acknowledged: true } : a
    ))
  }

  const handleSilence = (id) => {
    setAlerts(alerts.map(a => 
      a.id === id ? { ...a, silenced: true } : a
    ))
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'border-critical/50 bg-gradient-to-br from-critical/20 to-red-600/10 shadow-lg shadow-critical/20'
      case 'warning': return 'border-warning/50 bg-gradient-to-br from-warning/20 to-orange-600/10 shadow-lg shadow-warning/20'
      case 'info': return 'border-primary-600/50 bg-gradient-to-br from-primary-600/20 to-primary-700/10 shadow-lg shadow-primary-600/20'
      default: return 'border-infra-border bg-infra-bg'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-critical/20 to-red-600/10 rounded-xl border border-critical/30">
            <AlertTriangle size={28} className="text-critical" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-3xl text-white mb-2">Alerts & Incidents</h1>
            <p className="text-infra-muted">Monitor and manage infrastructure alerts</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-4 border border-infra-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-infra-muted" />
            <span className="text-sm text-infra-muted">Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-3 py-1.5 bg-infra-bg border border-infra-border rounded-lg text-white text-sm"
            >
              <option value="all">All</option>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-infra-muted">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 bg-infra-bg border border-infra-border rounded-lg text-white text-sm"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="silenced">Silenced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`glass rounded-xl p-6 border-2 ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-2 rounded-lg ${
                    alert.severity === 'critical' ? 'bg-critical/20' : 
                    alert.severity === 'warning' ? 'bg-warning/20' : 
                    'bg-primary-600/20'
                  }`}>
                    <AlertTriangle 
                      size={24} 
                      className={alert.severity === 'critical' ? 'text-critical' : alert.severity === 'warning' ? 'text-warning' : 'text-primary-400'} 
                    />
                  </div>
                  <h3 className="font-medium text-white text-lg">{alert.title}</h3>
                  <AlertBadge severity={alert.severity} />
                  {alert.acknowledged && (
                    <span className="px-2 py-1 bg-primary-600/20 border border-primary-600 rounded text-xs text-primary-400">
                      Acknowledged
                    </span>
                  )}
                  {alert.silenced && (
                    <span className="px-2 py-1 bg-infra-muted/20 border border-infra-muted rounded text-xs text-infra-muted">
                      Silenced
                    </span>
                  )}
                </div>
                <p className="text-infra-muted mb-3">{alert.description}</p>
                <div className="flex items-center space-x-4 text-sm text-infra-muted">
                  <span className="flex items-center space-x-1">
                    <Server size={14} />
                    <span>{alert.server}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{formatDistanceToNow(alert.timestamp, { addSuffix: true })}</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                {!alert.acknowledged && (
                  <button
                    onClick={() => handleAcknowledge(alert.id)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-primary-600 hover:bg-primary-700 
                             text-white rounded-lg text-sm transition-colors"
                  >
                    <CheckCircle size={16} />
                    <span>Acknowledge</span>
                  </button>
                )}
                {!alert.silenced && (
                  <button
                    onClick={() => handleSilence(alert.id)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-infra-bg hover:bg-infra-surface 
                             border border-infra-border text-white rounded-lg text-sm transition-colors"
                  >
                    <BellOff size={16} />
                    <span>Silence</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="glass rounded-xl p-12 border border-infra-border text-center">
          <AlertTriangle size={48} className="text-infra-muted mx-auto mb-4" />
          <p className="text-infra-muted">No alerts found matching your filters</p>
        </div>
      )}
    </div>
  )
}

export default Alerts
