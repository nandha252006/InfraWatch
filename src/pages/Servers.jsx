import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, MoreVertical, Edit, Trash2, Eye, Server } from 'lucide-react'
import HealthIndicator from '../components/HealthIndicator'
import { getServers } from '../services/dummyData'

function Servers() {
  const navigate = useNavigate()
  const [servers, setServers] = useState(getServers())
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedServer, setSelectedServer] = useState(null)

  const filteredServers = servers.filter(server =>
    server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    server.hostname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    server.ip.includes(searchQuery)
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-success'
      case 'warning': return 'text-warning'
      case 'critical': return 'text-critical'
      default: return 'text-infra-muted'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl border border-blue-500/30">
            <Server size={28} className="text-blue-400" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-3xl text-white mb-2">Servers Inventory</h1>
            <p className="text-infra-muted">Manage and monitor your infrastructure servers</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 
                   text-white rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          <Plus size={20} />
          <span>Add Server</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="glass rounded-xl p-4 border border-infra-border">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-infra-muted" size={20} />
            <input
              type="text"
              placeholder="Search servers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-infra-bg border border-infra-border rounded-lg 
                       text-white placeholder-infra-muted focus:outline-none focus:ring-2 
                       focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Servers Table */}
      <div className="glass rounded-xl border border-infra-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-infra-bg border-b border-infra-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-infra-muted uppercase tracking-wider">
                Server
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-infra-muted uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-infra-muted uppercase tracking-wider">
                CPU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-infra-muted uppercase tracking-wider">
                Memory
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-infra-muted uppercase tracking-wider">
                Disk
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-infra-muted uppercase tracking-wider">
                Uptime
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-infra-muted uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-infra-border">
            {filteredServers.map((server) => (
              <tr 
                key={server.id} 
                className="hover:bg-infra-bg/50 cursor-pointer transition-colors"
                onClick={() => navigate(`/servers/${server.id}`)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="font-medium text-white">{server.name}</div>
                    <div className="text-sm text-infra-muted">{server.hostname}</div>
                    <div className="text-xs text-infra-muted">{server.ip}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <HealthIndicator status={server.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-infra-bg rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          server.cpu > 80 ? 'bg-critical' : 
                          server.cpu > 60 ? 'bg-warning' : 
                          'bg-success'
                        }`}
                        style={{ width: `${server.cpu}%` }}
                      />
                    </div>
                    <span className={`text-sm font-medium ${getStatusColor(server.status)}`}>
                      {server.cpu.toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-infra-bg rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          server.memory > 85 ? 'bg-critical' : 
                          server.memory > 70 ? 'bg-warning' : 
                          'bg-success'
                        }`}
                        style={{ width: `${server.memory}%` }}
                      />
                    </div>
                    <span className={`text-sm font-medium ${getStatusColor(server.status)}`}>
                      {server.memory.toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-infra-bg rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          server.disk > 80 ? 'bg-critical' : 
                          server.disk > 60 ? 'bg-warning' : 
                          'bg-success'
                        }`}
                        style={{ width: `${server.disk}%` }}
                      />
                    </div>
                    <span className={`text-sm font-medium ${getStatusColor(server.status)}`}>
                      {server.disk.toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-infra-muted">
                  {server.uptime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/servers/${server.id}`)
                      }}
                      className="p-2 hover:bg-infra-border rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} className="text-primary-500" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedServer(server)
                        setShowEditModal(true)
                      }}
                      className="p-2 hover:bg-infra-border rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} className="text-warning" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (window.confirm(`Delete ${server.name}?`)) {
                          setServers(servers.filter(s => s.id !== server.id))
                        }
                      }}
                      className="p-2 hover:bg-infra-border rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} className="text-critical" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Server Modal */}
      {showAddModal && (
        <ServerModal
          onClose={() => setShowAddModal(false)}
          onSave={(server) => {
            setServers([...servers, { ...server, id: String(servers.length + 1) }])
            setShowAddModal(false)
          }}
        />
      )}

      {/* Edit Server Modal */}
      {showEditModal && selectedServer && (
        <ServerModal
          server={selectedServer}
          onClose={() => {
            setShowEditModal(false)
            setSelectedServer(null)
          }}
          onSave={(updatedServer) => {
            setServers(servers.map(s => s.id === selectedServer.id ? { ...updatedServer, id: s.id } : s))
            setShowEditModal(false)
            setSelectedServer(null)
          }}
        />
      )}
    </div>
  )
}

function ServerModal({ server, onClose, onSave }) {
  const [formData, setFormData] = useState(server || {
    name: '',
    hostname: '',
    ip: '',
    os: 'Ubuntu 22.04',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="glass rounded-xl p-6 border border-infra-border max-w-md w-full">
        <h2 className="font-heading font-bold text-2xl text-white mb-4">
          {server ? 'Edit Server' : 'Add Server'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-infra-muted mb-2">Server Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-infra-bg border border-infra-border rounded-lg text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-infra-muted mb-2">Hostname</label>
            <input
              type="text"
              value={formData.hostname}
              onChange={(e) => setFormData({ ...formData, hostname: e.target.value })}
              className="w-full px-4 py-2 bg-infra-bg border border-infra-border rounded-lg text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-infra-muted mb-2">IP Address</label>
            <input
              type="text"
              value={formData.ip}
              onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
              className="w-full px-4 py-2 bg-infra-bg border border-infra-border rounded-lg text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-infra-muted mb-2">OS</label>
            <select
              value={formData.os}
              onChange={(e) => setFormData({ ...formData, os: e.target.value })}
              className="w-full px-4 py-2 bg-infra-bg border border-infra-border rounded-lg text-white"
            >
              <option>Ubuntu 22.04</option>
              <option>Ubuntu 20.04</option>
              <option>CentOS 8</option>
              <option>Debian 11</option>
            </select>
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-infra-bg hover:bg-infra-surface border border-infra-border text-white py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Servers
