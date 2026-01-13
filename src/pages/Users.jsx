import { useState } from 'react'
import { Users as UsersIcon, Plus, Edit, Trash2, Shield, UserCheck, UserX } from 'lucide-react'
import { getUsers } from '../services/dummyData'
import { formatDistanceToNow } from 'date-fns'

function Users() {
  const [users, setUsers] = useState(getUsers())
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'bg-critical/20 text-critical border-critical'
      case 'SRE': return 'bg-warning/20 text-warning border-warning'
      case 'Viewer': return 'bg-primary-600/20 text-primary-400 border-primary-600'
      default: return 'bg-infra-bg text-infra-muted border-infra-border'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl border border-green-500/30">
            <UsersIcon size={28} className="text-green-400" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-3xl text-white mb-2">Users & RBAC</h1>
            <p className="text-infra-muted">Manage users, roles, and permissions</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 
                   text-white rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          <Plus size={20} />
          <span>Add User</span>
        </button>
      </div>

      {/* Role Permissions Matrix */}
      <div className="glass rounded-xl p-6 border border-infra-border bg-gradient-to-br from-green-500/10 to-green-600/5">
        <h3 className="font-medium text-white mb-4 flex items-center space-x-2">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <Shield size={20} className="text-green-400" />
          </div>
          <span>Role Permissions</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-infra-border">
                <th className="px-4 py-3 text-left text-sm font-medium text-infra-muted">Permission</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-infra-muted">Admin</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-infra-muted">SRE</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-infra-muted">Viewer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-infra-border">
              {[
                'View Dashboard',
                'View Servers',
                'Manage Servers',
                'View Alerts',
                'Acknowledge Alerts',
                'Manage Users',
                'View Metrics',
                'Export Data',
                'System Settings',
              ].map((permission) => (
                <tr key={permission}>
                  <td className="px-4 py-3 text-white">{permission}</td>
                  <td className="px-4 py-3 text-center">
                    <UserCheck size={20} className="text-success mx-auto" />
                  </td>
                  <td className="px-4 py-3 text-center">
                    {permission.includes('Manage Users') || permission.includes('System Settings') ? (
                      <UserX size={20} className="text-infra-muted mx-auto" />
                    ) : (
                      <UserCheck size={20} className="text-success mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {permission.includes('View') ? (
                      <UserCheck size={20} className="text-success mx-auto" />
                    ) : (
                      <UserX size={20} className="text-infra-muted mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Users List */}
      <div className="glass rounded-xl border border-infra-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-infra-bg border-b border-infra-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-infra-muted uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-infra-muted uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-infra-muted uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-infra-muted uppercase">Last Login</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-infra-muted uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-infra-border">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-infra-bg/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="font-medium text-white">{user.username}</div>
                    <div className="text-sm text-infra-muted">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.active ? (
                    <span className="flex items-center space-x-1 text-success">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span className="text-sm">Active</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1 text-infra-muted">
                      <div className="w-2 h-2 bg-infra-muted rounded-full" />
                      <span className="text-sm">Inactive</span>
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-infra-muted">
                  {formatDistanceToNow(user.lastLogin, { addSuffix: true })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user)
                        setShowEditModal(true)
                      }}
                      className="p-2 hover:bg-infra-border rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} className="text-warning" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete user ${user.username}?`)) {
                          setUsers(users.filter(u => u.id !== user.id))
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

      {/* Add/Edit User Modal */}
      {(showAddModal || showEditModal) && (
        <UserModal
          user={selectedUser}
          onClose={() => {
            setShowAddModal(false)
            setShowEditModal(false)
            setSelectedUser(null)
          }}
          onSave={(userData) => {
            if (selectedUser) {
              setUsers(users.map(u => u.id === selectedUser.id ? { ...userData, id: u.id } : u))
            } else {
              setUsers([...users, { ...userData, id: String(users.length + 1), active: true }])
            }
            setShowAddModal(false)
            setShowEditModal(false)
            setSelectedUser(null)
          }}
        />
      )}
    </div>
  )
}

function UserModal({ user, onClose, onSave }) {
  const [formData, setFormData] = useState(user || {
    username: '',
    email: '',
    role: 'Viewer',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="glass rounded-xl p-6 border border-infra-border max-w-md w-full">
        <h2 className="font-heading font-bold text-2xl text-white mb-4">
          {user ? 'Edit User' : 'Add User'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-infra-muted mb-2">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-2 bg-infra-bg border border-infra-border rounded-lg text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-infra-muted mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-infra-bg border border-infra-border rounded-lg text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-infra-muted mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 bg-infra-bg border border-infra-border rounded-lg text-white"
            >
              <option>Admin</option>
              <option>SRE</option>
              <option>Viewer</option>
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

export default Users
