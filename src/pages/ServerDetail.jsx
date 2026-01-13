import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Activity, Server, HardDrive, Network, Cpu } from 'lucide-react'
import Chart from '../components/Chart'
import HealthIndicator from '../components/HealthIndicator'
import { getServerById, getServerMetrics, getServiceProbes } from '../services/dummyData'

function ServerDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [server, setServer] = useState(null)
  const [metrics, setMetrics] = useState([])
  const [probes, setProbes] = useState([])
  const [timeRange, setTimeRange] = useState('1h')

  useEffect(() => {
    const serverData = getServerById(id)
    if (serverData) {
      setServer(serverData)
      setProbes(getServiceProbes(id))
    }

    const updateMetrics = () => {
      setMetrics(getServerMetrics(id, timeRange))
    }
    updateMetrics()
    const interval = setInterval(updateMetrics, 5000)

    return () => clearInterval(interval)
  }, [id, timeRange])

  if (!server) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-infra-muted">Server not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/servers')}
            className="p-2 hover:bg-infra-border rounded-lg transition-colors hover:scale-110"
          >
            <ArrowLeft size={20} className="text-infra-muted" />
          </button>
          <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl border border-blue-500/30">
            <Server size={28} className="text-blue-400" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-3xl text-white mb-2">{server.name}</h1>
            <div className="flex items-center space-x-4 text-sm text-infra-muted">
              <span>{server.hostname}</span>
              <span>•</span>
              <span>{server.ip}</span>
              <span>•</span>
              <HealthIndicator status={server.status} />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {['1h', '6h', '24h', '7d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                timeRange === range
                  ? 'bg-primary-600 text-white'
                  : 'bg-infra-bg text-infra-muted hover:bg-infra-surface'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass rounded-xl p-6 border border-infra-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-infra-muted">CPU Usage</span>
            <Cpu size={20} className="text-primary-500" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">{server.cpu.toFixed(1)}%</div>
          <div className="w-full bg-infra-bg rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                server.cpu > 80 ? 'bg-critical' : 
                server.cpu > 60 ? 'bg-warning' : 
                'bg-success'
              }`}
              style={{ width: `${server.cpu}%` }}
            />
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-infra-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-infra-muted">Memory Usage</span>
            <Activity size={20} className="text-primary-500" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">{server.memory.toFixed(1)}%</div>
          <div className="w-full bg-infra-bg rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                server.memory > 85 ? 'bg-critical' : 
                server.memory > 70 ? 'bg-warning' : 
                'bg-success'
              }`}
              style={{ width: `${server.memory}%` }}
            />
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-infra-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-infra-muted">Disk Usage</span>
            <HardDrive size={20} className="text-primary-500" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">{server.disk.toFixed(1)}%</div>
          <div className="w-full bg-infra-bg rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                server.disk > 80 ? 'bg-critical' : 
                server.disk > 60 ? 'bg-warning' : 
                'bg-success'
              }`}
              style={{ width: `${server.disk}%` }}
            />
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-infra-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-infra-muted">Uptime</span>
            <Server size={20} className="text-primary-500" />
          </div>
          <div className="text-2xl font-bold text-white">{server.uptime}</div>
          <div className="text-sm text-infra-muted mt-2">{server.os}</div>
        </div>
      </div>

      {/* Time Series Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-6 border border-infra-border">
          <h3 className="font-medium text-white mb-4">CPU Usage Over Time</h3>
          <Chart 
            data={metrics} 
            dataKey="cpu" 
            name="CPU %"
            color="#14b8a6"
            height={300}
          />
        </div>
        <div className="glass rounded-xl p-6 border border-infra-border">
          <h3 className="font-medium text-white mb-4">Memory Usage Over Time</h3>
          <Chart 
            data={metrics} 
            dataKey="memory" 
            name="Memory %"
            color="#10b981"
            height={300}
          />
        </div>
        <div className="glass rounded-xl p-6 border border-infra-border">
          <h3 className="font-medium text-white mb-4">Disk Usage Over Time</h3>
          <Chart 
            data={metrics} 
            dataKey="disk" 
            name="Disk %"
            color="#f59e0b"
            height={300}
          />
        </div>
        <div className="glass rounded-xl p-6 border border-infra-border">
          <h3 className="font-medium text-white mb-4">Network I/O</h3>
          <Chart 
            data={metrics} 
            type="area"
            dataKey="networkIn" 
            name="Network In (Mbps)"
            color="#8b5cf6"
            height={300}
          />
        </div>
      </div>

      {/* Service Probes */}
      <div className="glass rounded-xl p-6 border border-infra-border">
        <h3 className="font-medium text-white mb-4">Service Probes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {probes.map((probe, index) => (
            <div 
              key={index}
              className="p-4 bg-infra-bg rounded-lg border border-infra-border"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">{probe.name}</span>
                <HealthIndicator status={probe.status} size="sm" />
              </div>
              <div className="text-sm text-infra-muted">
                Port: {probe.port} • {probe.responseTime}ms
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div className="glass rounded-xl p-6 border border-infra-border">
        <h3 className="font-medium text-white mb-4">Running Services</h3>
        <div className="flex flex-wrap gap-2">
          {server.services.map((service, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-600/20 border border-primary-600 rounded-lg text-sm text-primary-400"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServerDetail
