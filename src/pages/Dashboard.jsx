import { useState, useEffect } from 'react'
import { Cpu, HardDrive, Activity, Network, Server, AlertTriangle, Zap, TrendingUp, Database, Globe, Shield, BarChart3 } from 'lucide-react'
import MetricCard from '../components/MetricCard'
import Chart from '../components/Chart'
import { getDashboardMetrics, getServerMetrics } from '../services/dummyData'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  const [metrics, setMetrics] = useState(getDashboardMetrics())
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(getDashboardMetrics())
      setChartData(getServerMetrics('1', '1h'))
    }, 5000)

    setChartData(getServerMetrics('1', '1h'))

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <div className="p-4 bg-gradient-to-br from-primary-500/30 to-primary-600/20 rounded-2xl border border-primary-500/40 shadow-lg shadow-primary-500/20 hover:scale-105 transition-transform">
            <BarChart3 size={32} className="text-primary-300" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-4xl text-white mb-3 flex items-center space-x-3">
              <span className="bg-gradient-to-r from-white to-infra-muted bg-clip-text text-transparent">Live Dashboard</span>
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-success/20 border border-success/40 rounded-xl backdrop-blur-sm shadow-lg shadow-success/20">
                <div className="w-2.5 h-2.5 bg-success rounded-full animate-pulse shadow-lg shadow-success" />
                <span className="text-xs font-bold text-success uppercase tracking-wider">LIVE</span>
              </div>
            </h1>
            <p className="text-infra-muted text-lg">Real-time infrastructure monitoring overview</p>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Servers"
          value={metrics.totalServers}
          icon={Server}
          iconColor="blue"
          trend="up"
          trendValue="+2"
          status="success"
        />
        <MetricCard
          title="Active Alerts"
          value={metrics.totalAlerts}
          icon={AlertTriangle}
          iconColor="critical"
          status={metrics.totalAlerts > 0 ? 'critical' : 'normal'}
        />
        <MetricCard
          title="Avg CPU Usage"
          value={metrics.avgCpu.toFixed(1)}
          unit="%"
          icon={Cpu}
          iconColor="orange"
          trend="up"
          trendValue="+5.2%"
          status={metrics.avgCpu > 80 ? 'critical' : metrics.avgCpu > 60 ? 'warning' : 'normal'}
        />
        <MetricCard
          title="Avg Memory"
          value={metrics.avgMemory.toFixed(1)}
          unit="%"
          icon={HardDrive}
          iconColor="purple"
          trend="down"
          trendValue="-2.1%"
          status={metrics.avgMemory > 85 ? 'critical' : metrics.avgMemory > 70 ? 'warning' : 'normal'}
        />
      </div>

      {/* Server Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-strong rounded-2xl p-6 border border-infra-border/50 bg-gradient-to-br from-blue-500/15 to-blue-600/8 card-hover">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/25 rounded-xl shadow-lg">
                <Server size={22} className="text-blue-300" />
              </div>
              <h3 className="font-semibold text-white text-lg">Server Health</h3>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-infra-muted">Healthy</span>
              </div>
              <span className="text-success font-bold text-lg">{metrics.healthyServers}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                <span className="text-infra-muted">Warning</span>
              </div>
              <span className="text-warning font-bold text-lg">{metrics.warningServers}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-critical/10 border border-critical/20">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-critical rounded-full animate-pulse" />
                <span className="text-infra-muted">Critical</span>
              </div>
              <span className="text-critical font-bold text-lg">{metrics.criticalServers}</span>
            </div>
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-6 border border-infra-border/50 bg-gradient-to-br from-purple-500/15 to-purple-600/8 card-hover">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-500/25 rounded-xl shadow-lg">
                <Network size={22} className="text-purple-300" />
              </div>
              <h3 className="font-semibold text-white text-lg">Network Throughput</h3>
            </div>
          </div>
          <div className="flex items-baseline space-x-2 mb-4">
            <span className="text-3xl font-bold text-white">{metrics.networkThroughput.toFixed(1)}</span>
            <span className="text-lg text-infra-muted">Mbps</span>
          </div>
          <div className="mt-4">
            <div className="w-full bg-infra-bg rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all shadow-lg"
                style={{ width: `${(metrics.networkThroughput / 2000) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-6 border border-infra-border/50 bg-gradient-to-br from-orange-500/15 to-orange-600/8 card-hover">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-500/25 rounded-xl shadow-lg">
                <HardDrive size={22} className="text-orange-300" />
              </div>
              <h3 className="font-semibold text-white text-lg">Avg Disk Usage</h3>
            </div>
          </div>
          <div className="flex items-baseline space-x-2 mb-4">
            <span className="text-3xl font-bold text-white">{metrics.avgDisk.toFixed(1)}</span>
            <span className="text-lg text-infra-muted">%</span>
          </div>
          <div className="mt-4">
            <div className="w-full bg-infra-bg rounded-full h-3 overflow-hidden">
              <div 
                className={`h-3 rounded-full transition-all shadow-lg ${
                  metrics.avgDisk > 80 ? 'bg-gradient-to-r from-critical to-red-600' : 
                  metrics.avgDisk > 60 ? 'bg-gradient-to-r from-warning to-orange-500' : 
                  'bg-gradient-to-r from-success to-green-500'
                }`}
                style={{ width: `${metrics.avgDisk}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-strong rounded-2xl p-6 border border-infra-border/50 bg-gradient-to-br from-orange-500/15 to-orange-600/8 card-hover">
          <div className="flex items-center space-x-3 mb-5">
            <div className="p-3 bg-orange-500/25 rounded-xl shadow-lg">
              <Cpu size={22} className="text-orange-300" />
            </div>
            <h3 className="font-semibold text-white text-lg">CPU Usage (Last Hour)</h3>
          </div>
          <Chart 
            data={chartData} 
            dataKey="cpu" 
            name="CPU %"
            color="#f97316"
            height={280}
          />
        </div>
        <div className="glass-strong rounded-2xl p-6 border border-infra-border/50 bg-gradient-to-br from-purple-500/15 to-purple-600/8 card-hover">
          <div className="flex items-center space-x-3 mb-5">
            <div className="p-3 bg-purple-500/25 rounded-xl shadow-lg">
              <HardDrive size={22} className="text-purple-300" />
            </div>
            <h3 className="font-semibold text-white text-lg">Memory Usage (Last Hour)</h3>
          </div>
          <Chart 
            data={chartData} 
            dataKey="memory" 
            name="Memory %"
            color="#a855f7"
            height={280}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass rounded-xl p-6 border border-infra-border">
        <div className="flex items-center space-x-2 mb-6">
          <Zap size={20} className="text-primary-400" />
          <h3 className="font-medium text-white">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/servers')}
            className="group p-5 bg-gradient-to-br from-blue-500/20 to-blue-600/10 hover:from-blue-500/30 hover:to-blue-600/20 
                     border border-blue-500/30 rounded-xl text-left transition-all hover:scale-105 hover:shadow-lg"
          >
            <div className="p-2 bg-blue-500/20 rounded-lg w-fit mb-3 group-hover:scale-110 transition-transform">
              <Server size={24} className="text-blue-400" />
            </div>
            <p className="text-sm font-medium text-white">View Servers</p>
            <p className="text-xs text-infra-muted mt-1">Manage infrastructure</p>
          </button>
          <button
            onClick={() => navigate('/alerts')}
            className="group p-5 bg-gradient-to-br from-critical/20 to-red-600/10 hover:from-critical/30 hover:to-red-600/20 
                     border border-critical/30 rounded-xl text-left transition-all hover:scale-105 hover:shadow-lg"
          >
            <div className="p-2 bg-critical/20 rounded-lg w-fit mb-3 group-hover:scale-110 transition-transform">
              <AlertTriangle size={24} className="text-critical" />
            </div>
            <p className="text-sm font-medium text-white">View Alerts</p>
            <p className="text-xs text-infra-muted mt-1">Monitor incidents</p>
          </button>
          <button
            onClick={() => navigate('/metrics')}
            className="group p-5 bg-gradient-to-br from-primary-500/20 to-primary-600/10 hover:from-primary-500/30 hover:to-primary-600/20 
                     border border-primary-500/30 rounded-xl text-left transition-all hover:scale-105 hover:shadow-lg"
          >
            <div className="p-2 bg-primary-500/20 rounded-lg w-fit mb-3 group-hover:scale-110 transition-transform">
              <BarChart3 size={24} className="text-primary-400" />
            </div>
            <p className="text-sm font-medium text-white">Analytics</p>
            <p className="text-xs text-infra-muted mt-1">Query metrics</p>
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="group p-5 bg-gradient-to-br from-purple-500/20 to-purple-600/10 hover:from-purple-500/30 hover:to-purple-600/20 
                     border border-purple-500/30 rounded-xl text-left transition-all hover:scale-105 hover:shadow-lg"
          >
            <div className="p-2 bg-purple-500/20 rounded-lg w-fit mb-3 group-hover:scale-110 transition-transform">
              <Shield size={24} className="text-purple-400" />
            </div>
            <p className="text-sm font-medium text-white">Settings</p>
            <p className="text-xs text-infra-muted mt-1">Configure system</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
