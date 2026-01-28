import { useState } from 'react'
import { Settings as SettingsIcon, Save, RefreshCw, Bell, Database, Palette } from 'lucide-react'

function Settings() {
  const [settings, setSettings] = useState({
    pollingInterval: 5000,
    alertThresholds: {
      cpu: 80,
      memory: 85,
      disk: 80,
    },
    retentionDays: 30,
    theme: 'dark',
    notifications: {
      email: true,
      slack: true,
      webhook: true,
    },
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Simulate save
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3">
            <SettingsIcon size={28} className="text-yellow-400" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-3xl text-white mb-2">Settings</h1>
            <p className="text-infra-muted">Configure system settings and preferences</p>
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

      {/* Polling Settings */}
      <div className="rounded-xl p-6 border border-infra-border">
        <h3 className="font-medium text-white mb-4 flex items-center space-x-2">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <RefreshCw size={20} className="text-blue-400" />
          </div>
          <span>Polling Intervals</span>
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-infra-muted mb-2">
              Metric Polling Interval (ms)
            </label>
            <input
              type="number"
              value={settings.pollingInterval}
              onChange={(e) => setSettings({ ...settings, pollingInterval: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-infra-bg border border-infra-border rounded-lg text-white"
              min="1000"
              step="1000"
            />
            <p className="text-xs text-infra-muted mt-1">
              Current: {settings.pollingInterval}ms ({(settings.pollingInterval / 1000).toFixed(1)}s)
            </p>
          </div>
        </div>
      </div>

      {/* Alert Thresholds */}
      <div className="glass rounded-xl p-6 border border-infra-border ">
        <h3 className="font-medium text-white mb-4 flex items-center space-x-2">
          <div className="p-2 bg-critical/20 rounded-lg">
            <Bell size={20} className="text-critical" />
          </div>
          <span>Alert Thresholds</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-infra-muted mb-2">
              CPU Threshold (%)
            </label>
            <input
              type="number"
              value={settings.alertThresholds.cpu}
              onChange={(e) => setSettings({
                ...settings,
                alertThresholds: { ...settings.alertThresholds, cpu: parseInt(e.target.value) }
              })}
              className="w-full px-4 py-2 bg-infra-bg border border-infra-border rounded-lg text-white"
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-infra-muted mb-2">
              Memory Threshold (%)
            </label>
            <input
              type="number"
              value={settings.alertThresholds.memory}
              onChange={(e) => setSettings({
                ...settings,
                alertThresholds: { ...settings.alertThresholds, memory: parseInt(e.target.value) }
              })}
              className="w-full px-4 py-2 bg-infra-bg border border-infra-border rounded-lg text-white"
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-infra-muted mb-2">
              Disk Threshold (%)
            </label>
            <input
              type="number"
              value={settings.alertThresholds.disk}
              onChange={(e) => setSettings({
                ...settings,
                alertThresholds: { ...settings.alertThresholds, disk: parseInt(e.target.value) }
              })}
              className="w-full px-4 py-2 bg-infra-bg border border-infra-border rounded-lg text-white"
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>

      {/* Data Retention */}
      <div className="glass rounded-xl p-6 border border-infra-border">
        <h3 className="font-medium text-white mb-4 flex items-center space-x-2">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Database size={20} className="text-purple-400" />
          </div>
          <span>Data Retention</span>
        </h3>
        <div>
          <label className="block text-sm font-medium text-infra-muted mb-2">
            Retention Period (days)
          </label>
          <input
            type="number"
            value={settings.retentionDays}
            onChange={(e) => setSettings({ ...settings, retentionDays: parseInt(e.target.value) })}
            className="w-full px-4 py-2 bg-infra-bg border border-infra-border rounded-lg text-white"
            min="1"
            max="365"
          />
          <p className="text-xs text-infra-muted mt-1">
            Metrics older than {settings.retentionDays} days will be automatically deleted
          </p>
        </div>
      </div>

      {/* Notification Channels */}
      <div className="glass rounded-xl p-6 border border-infra-border">
        <h3 className="font-medium text-white mb-4 flex items-center space-x-2">
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <Bell size={20} className="text-orange-400" />
          </div>
          <span>Notification Channels</span>
        </h3>
        <div className="space-y-3">
          {Object.entries(settings.notifications).map(([channel, enabled]) => (
            <label key={channel} className="flex items-center justify-between p-3 bg-infra-bg rounded-lg">
              <span className="text-white capitalize">{channel}</span>
            <input
  type="checkbox"
  checked={enabled}
  onChange={(e) =>
    setSettings({
      ...settings,
      notifications: { ...settings.notifications, [channel]: e.target.checked }
    })
  }
  className="w-5 h-5 rounded border border-infra-border bg-infra-bg checked:bg-orange-400 checked:border-orange-400 appearance-none cursor-pointer"
/>
            </label>
          ))}
        </div>
      </div>

      {/* Theme Settings */}
      <div className="glass rounded-xl p-6 border border-infra-border">
        <h3 className="font-medium text-white mb-4 flex items-center space-x-2">
          <div className="p-2 bg-pink-500/20 rounded-lg">
            <Palette size={20} className="text-pink-400" />
          </div>
          <span>Theme & Layout</span>
        </h3>
        <div>
          <label className="block text-sm font-medium text-infra-muted mb-2">
            Theme
          </label>
          <select
            value={settings.theme}
            onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
            className="w-full px-4 py-2 bg-infra-bg border border-infra-border rounded-lg text-white"
          >
            <option value="dark">Dark (Default)</option>
            <option value="light">Light</option>
            <option value="auto">Auto</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Settings
