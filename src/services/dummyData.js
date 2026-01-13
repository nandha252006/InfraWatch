// Dummy Data Service for InfraWatch

// Servers Data
export const getServers = () => {
  return [
    {
      id: '1',
      name: 'web-server-01',
      hostname: 'web01.example.com',
      ip: '192.168.1.10',
      status: 'healthy',
      cpu: 45.2,
      memory: 62.8,
      disk: 34.5,
      uptime: '45d 12h',
      os: 'Ubuntu 22.04',
      services: ['nginx', 'nodejs', 'redis'],
    },
    {
      id: '2',
      name: 'db-server-01',
      hostname: 'db01.example.com',
      ip: '192.168.1.20',
      status: 'warning',
      cpu: 78.5,
      memory: 89.2,
      disk: 67.3,
      uptime: '120d 8h',
      os: 'Ubuntu 22.04',
      services: ['postgresql', 'redis'],
    },
    {
      id: '3',
      name: 'app-server-01',
      hostname: 'app01.example.com',
      ip: '192.168.1.30',
      status: 'healthy',
      cpu: 32.1,
      memory: 45.6,
      disk: 23.4,
      uptime: '30d 4h',
      os: 'CentOS 8',
      services: ['docker', 'kafka'],
    },
    {
      id: '4',
      name: 'cache-server-01',
      hostname: 'cache01.example.com',
      ip: '192.168.1.40',
      status: 'critical',
      cpu: 95.8,
      memory: 98.5,
      disk: 89.2,
      uptime: '5d 2h',
      os: 'Ubuntu 22.04',
      services: ['redis', 'memcached'],
    },
    {
      id: '5',
      name: 'monitor-server-01',
      hostname: 'monitor01.example.com',
      ip: '192.168.1.50',
      status: 'healthy',
      cpu: 25.3,
      memory: 38.9,
      disk: 45.7,
      uptime: '200d 15h',
      os: 'Debian 11',
      services: ['prometheus', 'grafana'],
    },
  ]
}

export const getServerById = (id) => {
  return getServers().find(s => s.id === id)
}

// Metrics Data (Time Series)
export const getServerMetrics = (serverId, timeRange = '1h') => {
  const now = Date.now()
  const intervals = {
    '1h': 60000, // 1 minute intervals
    '6h': 360000, // 6 minute intervals
    '24h': 1440000, // 24 minute intervals
    '7d': 10080000, // 168 minute intervals
  }
  const interval = intervals[timeRange] || intervals['1h']
  const points = 60

  const data = []
  for (let i = points; i >= 0; i--) {
    const time = new Date(now - i * interval)
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      timestamp: time.getTime(),
      cpu: Math.random() * 100,
      memory: Math.random() * 100,
      disk: Math.random() * 100,
      networkIn: Math.random() * 1000,
      networkOut: Math.random() * 1000,
    })
  }
  return data
}

// Alerts Data
export const getAlerts = () => {
  return [
    {
      id: '1',
      severity: 'critical',
      title: 'High CPU Usage on cache-server-01',
      description: 'CPU usage has exceeded 95% for the past 15 minutes',
      server: 'cache-server-01',
      timestamp: new Date(Date.now() - 5 * 60000),
      acknowledged: false,
      silenced: false,
    },
    {
      id: '2',
      severity: 'warning',
      title: 'High Memory Usage on db-server-01',
      description: 'Memory usage is above 85% threshold',
      server: 'db-server-01',
      timestamp: new Date(Date.now() - 30 * 60000),
      acknowledged: true,
      silenced: false,
    },
    {
      id: '3',
      severity: 'critical',
      title: 'Disk Space Critical on cache-server-01',
      description: 'Disk usage has reached 89% capacity',
      server: 'cache-server-01',
      timestamp: new Date(Date.now() - 10 * 60000),
      acknowledged: false,
      silenced: false,
    },
    {
      id: '4',
      severity: 'warning',
      title: 'Service Down: nginx on web-server-01',
      description: 'HTTP probe failed for nginx service',
      server: 'web-server-01',
      timestamp: new Date(Date.now() - 60 * 60000),
      acknowledged: false,
      silenced: false,
    },
    {
      id: '5',
      severity: 'info',
      title: 'High Network Traffic on app-server-01',
      description: 'Network traffic spike detected',
      server: 'app-server-01',
      timestamp: new Date(Date.now() - 120 * 60000),
      acknowledged: true,
      silenced: true,
    },
  ]
}

export const getActiveAlertsCount = () => {
  return getAlerts().filter(a => !a.acknowledged && !a.silenced && a.severity !== 'info').length
}

// Dashboard Metrics
export const getDashboardMetrics = () => {
  return {
    totalServers: 5,
    healthyServers: 3,
    warningServers: 1,
    criticalServers: 1,
    totalAlerts: getActiveAlertsCount(),
    avgCpu: 55.4,
    avgMemory: 67.2,
    avgDisk: 52.0,
    networkThroughput: 1250.5,
  }
}

// WebSocket Status (simulated)
let wsStatus = true
export const getWebSocketStatus = () => wsStatus
export const setWebSocketStatus = (status) => { wsStatus = status }

// Notifications Data
export const getNotifications = () => {
  return [
    {
      id: '1',
      type: 'email',
      recipient: 'admin@example.com',
      alert: 'High CPU Usage on cache-server-01',
      status: 'delivered',
      timestamp: new Date(Date.now() - 5 * 60000),
      retries: 0,
    },
    {
      id: '2',
      type: 'slack',
      recipient: '#alerts',
      alert: 'High Memory Usage on db-server-01',
      status: 'delivered',
      timestamp: new Date(Date.now() - 30 * 60000),
      retries: 0,
    },
    {
      id: '3',
      type: 'webhook',
      recipient: 'https://api.example.com/webhook',
      alert: 'Disk Space Critical on cache-server-01',
      status: 'failed',
      timestamp: new Date(Date.now() - 10 * 60000),
      retries: 3,
    },
    {
      id: '4',
      type: 'email',
      recipient: 'sre@example.com',
      alert: 'Service Down: nginx on web-server-01',
      status: 'pending',
      timestamp: new Date(Date.now() - 2 * 60000),
      retries: 0,
    },
  ]
}

// Users Data
export const getUsers = () => {
  return [
    {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      role: 'Admin',
      lastLogin: new Date(Date.now() - 2 * 3600000),
      active: true,
    },
    {
      id: '2',
      username: 'sre_engineer',
      email: 'sre@example.com',
      role: 'SRE',
      lastLogin: new Date(Date.now() - 5 * 3600000),
      active: true,
    },
    {
      id: '3',
      username: 'viewer',
      email: 'viewer@example.com',
      role: 'Viewer',
      lastLogin: new Date(Date.now() - 24 * 3600000),
      active: true,
    },
  ]
}

// Service Probes Data
export const getServiceProbes = (serverId) => {
  return [
    { name: 'HTTP', port: 80, status: 'healthy', responseTime: 45 },
    { name: 'HTTPS', port: 443, status: 'healthy', responseTime: 52 },
    { name: 'SSH', port: 22, status: 'healthy', responseTime: 12 },
    { name: 'PostgreSQL', port: 5432, status: 'warning', responseTime: 234 },
    { name: 'Redis', port: 6379, status: 'healthy', responseTime: 8 },
  ]
}
