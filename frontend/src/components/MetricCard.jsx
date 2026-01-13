import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

function MetricCard({ title, value, unit, trend, trendValue, icon: Icon, status = 'normal', iconColor = 'primary' }) {
  const statusColors = {
    normal: 'border-infra-border bg-gradient-to-br from-infra-surface/50 to-infra-surface/30',
    warning: 'border-warning/50 bg-gradient-to-br from-warning/20 to-warning/10',
    critical: 'border-critical/50 bg-gradient-to-br from-critical/20 to-critical/10',
    success: 'border-success/50 bg-gradient-to-br from-success/20 to-success/10',
  }

  const iconColors = {
    primary: 'text-primary-400 bg-primary-500/20',
    success: 'text-success-400 bg-success-500/20',
    warning: 'text-warning-400 bg-warning-500/20',
    critical: 'text-critical bg-critical/20',
    blue: 'text-blue-400 bg-blue-500/20',
    purple: 'text-purple-400 bg-purple-500/20',
    orange: 'text-orange-400 bg-orange-500/20',
  }

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp size={16} className="text-success" />
    if (trend === 'down') return <TrendingDown size={16} className="text-critical" />
    return <Minus size={16} className="text-infra-muted" />
  }

  return (
    <div className={`glass-strong rounded-2xl p-6 border ${statusColors[status]} card-hover relative overflow-hidden group cursor-pointer`}>
      {/* Animated shimmer effect */}
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glowing border effect */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        status === 'critical' ? 'shadow-[0_0_30px_rgba(239,68,68,0.3)]' :
        status === 'warning' ? 'shadow-[0_0_30px_rgba(245,158,11,0.3)]' :
        status === 'success' ? 'shadow-[0_0_30px_rgba(16,185,129,0.3)]' :
        'shadow-[0_0_30px_rgba(20,184,166,0.3)]'
      }`} />
      
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className={`p-3 rounded-xl ${iconColors[iconColor]} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={24} className="drop-shadow-lg" />
              </div>
            )}
            <h3 className="text-sm font-semibold text-infra-muted uppercase tracking-wide">{title}</h3>
          </div>
          {trend && (
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-infra-bg/70 backdrop-blur-sm border border-infra-border/50">
              {getTrendIcon()}
              <span className={`text-xs font-bold ${trend === 'up' ? 'text-success' : trend === 'down' ? 'text-critical' : 'text-infra-muted'}`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-5xl font-bold text-white drop-shadow-lg tracking-tight">{value}</span>
          {unit && <span className="text-xl text-infra-muted font-semibold">{unit}</span>}
        </div>
      </div>
    </div>
  )
}

export default MetricCard
