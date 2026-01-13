import { useState } from 'react'
import { User, Key, Shield, Clock, Smartphone, Save } from 'lucide-react'

function Profile() {
  const [profile, setProfile] = useState({
    username: 'admin',
    email: 'admin@example.com',
    role: 'Admin',
    mfaEnabled: false,
    apiTokens: [
      { id: '1', name: 'Production API', created: new Date(Date.now() - 30 * 24 * 3600000), lastUsed: new Date(Date.now() - 2 * 3600000) },
      { id: '2', name: 'Development API', created: new Date(Date.now() - 7 * 24 * 3600000), lastUsed: new Date(Date.now() - 24 * 3600000) },
    ],
    activeSessions: [
      { id: '1', ip: '192.168.1.100', location: 'Office', lastActive: new Date(Date.now() - 5 * 60000), current: true },
      { id: '2', ip: '10.0.0.50', location: 'Remote', lastActive: new Date(Date.now() - 2 * 3600000), current: false },
    ],
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const revokeToken = (id) => {
    setProfile({
      ...profile,
      apiTokens: profile.apiTokens.filter(t => t.id !== id)
    })
  }

  const revokeSession = (id) => {
    setProfile({
      ...profile,
      activeSessions: profile.activeSessions.filter(s => s.id !== id)
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 rounded-xl border border-cyan-500/30">
            <User size={28} className="text-cyan-400" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-3xl text-white mb-2">Profile & Sessions</h1>
            <p className="text-infra-muted">Manage your account settings and security</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 ${
            saved 
              ? 'bg-gradient-to-r from-success to-green-600 text-white' 
              : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white'
          }`}
        >
          <Save size={20} />
          <span>{saved ? 'Saved!' : 'Save Changes'}</span>
        </button>
      </div>

      {/* Profile Information */}
      <div className="glass rounded-xl p-6 border border-infra-border">
        <h3 className="font-medium text-white mb-4 flex items-center space-x-2">
          <User size={20} className="text-primary-500" />
          <span>Profile Information</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-infra-muted mb-2">Username</label>
            <input
              type="text"
              value={profile.username}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
              className="w-full px-4 py-2 bg-infra-bg border border-infra-border rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-infra-muted mb-2">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-4 py-2 bg-infra-bg border border-infra-border rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-infra-muted mb-2">Role</label>
            <input
              type="text"
              value={profile.role}
              disabled
              className="w-full px-4 py-2 bg-infra-bg border border-infra-border rounded-lg text-white opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-infra-muted mb-2">Password</label>
            <button className="w-full px-4 py-2 bg-infra-bg hover:bg-infra-surface border border-infra-border rounded-lg text-white text-left">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* MFA Status */}
      <div className="glass rounded-xl p-6 border border-infra-border">
        <h3 className="font-medium text-white mb-4 flex items-center space-x-2">
          <Shield size={20} className="text-primary-500" />
          <span>Multi-Factor Authentication</span>
        </h3>
        <div className="flex items-center justify-between p-4 bg-infra-bg rounded-lg">
          <div>
            <div className="text-white font-medium">MFA Status</div>
            <div className="text-sm text-infra-muted">
              {profile.mfaEnabled ? 'Enabled' : 'Disabled'}
            </div>
          </div>
          <button
            onClick={() => setProfile({ ...profile, mfaEnabled: !profile.mfaEnabled })}
            className={`px-4 py-2 rounded-lg transition-colors ${
              profile.mfaEnabled
                ? 'bg-critical hover:bg-critical/80 text-white'
                : 'bg-primary-600 hover:bg-primary-700 text-white'
            }`}
          >
            {profile.mfaEnabled ? 'Disable MFA' : 'Enable MFA'}
          </button>
        </div>
      </div>

      {/* API Tokens */}
      <div className="glass rounded-xl p-6 border border-infra-border">
        <h3 className="font-medium text-white mb-4 flex items-center space-x-2">
          <Key size={20} className="text-primary-500" />
          <span>API Tokens</span>
        </h3>
        <div className="space-y-3">
          {profile.apiTokens.map((token) => (
            <div key={token.id} className="p-4 bg-infra-bg rounded-lg border border-infra-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">{token.name}</div>
                  <div className="text-sm text-infra-muted">
                    Created {token.created.toLocaleDateString()} • 
                    Last used {token.lastUsed.toLocaleDateString()}
                  </div>
                </div>
                <button
                  onClick={() => revokeToken(token.id)}
                  className="px-3 py-1.5 bg-critical/20 hover:bg-critical/30 border border-critical rounded-lg text-critical text-sm"
                >
                  Revoke
                </button>
              </div>
            </div>
          ))}
          <button className="w-full p-4 bg-infra-bg hover:bg-infra-surface border border-infra-border rounded-lg text-primary-500 text-center">
            + Generate New Token
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="glass rounded-xl p-6 border border-infra-border">
        <h3 className="font-medium text-white mb-4 flex items-center space-x-2">
          <Clock size={20} className="text-primary-500" />
          <span>Active Sessions</span>
        </h3>
        <div className="space-y-3">
          {profile.activeSessions.map((session) => (
            <div key={session.id} className="p-4 bg-infra-bg rounded-lg border border-infra-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone size={20} className="text-primary-500" />
                  <div>
                    <div className="font-medium text-white">
                      {session.location}
                      {session.current && (
                        <span className="ml-2 px-2 py-0.5 bg-primary-600/20 border border-primary-600 rounded text-xs text-primary-400">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-infra-muted">
                      {session.ip} • Last active {session.lastActive.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                {!session.current && (
                  <button
                    onClick={() => revokeSession(session.id)}
                    className="px-3 py-1.5 bg-critical/20 hover:bg-critical/30 border border-critical rounded-lg text-critical text-sm"
                  >
                    Revoke
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
