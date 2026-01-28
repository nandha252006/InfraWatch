import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

function MetricCard({ 
  title, 
  value, 
  unit, 
  trend, 
  trendValue, 
  icon: Icon, 
  status = 'normal', 
  iconColor = 'primary' 
}) {
  const statusColors = {
    normal: 'border-infra-border/20 bg-infra-surface/30',
    warning: 'border-warning/20 bg-warning/5',
    critical: 'border-critical/20 bg-critical/5',
    success: 'border-success/20 bg-success/5',
  }

  const iconColors = {
    primary: 'text-primary-400 bg-primary-500/10',
    success: 'text-success-400 bg-success-500/10',
    warning: 'text-warning-400 bg-warning-500/10',
    critical: 'text-critical bg-critical/10',
    blue: 'text-blue-400 bg-blue-500/10',
    purple: 'text-purple-400 bg-purple-500/10',
    orange: 'text-orange-400 bg-orange-500/10',
  }

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp size={14} strokeWidth={2.5} className="text-success" />
    if (trend === 'down') return <TrendingDown size={14} strokeWidth={2.5} className="text-critical" />
    return <Minus size={14} strokeWidth={2.5} className="text-infra-muted" />
  }

  return (
    <div 
      className={`
        relative
        rounded-2xl border
        ${statusColors[status]}
        backdrop-blur-2xl
        p-6
        transition-all duration-300
        hover:border-infra-border/40
        hover:bg-infra-surface/50
        group cursor-pointer
      `}
    >
      {/* Content */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className={`
              p-2.5 rounded-xl ${iconColors[iconColor]}
              transition-transform duration-300
              group-hover:scale-110
            `}>
              <Icon size={20} strokeWidth={2} />
            </div>
          )}
          <span className="text-xs font-bold text-infra-muted/70 uppercase tracking-wide">
            {title}
          </span>
        </div>

        {trend && (
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-infra-bg/40 border border-infra-border/20">
            {getTrendIcon()}
            <span className={`text-xs font-bold ${
              trend === 'up' ? 'text-success' : 
              trend === 'down' ? 'text-critical' : 
              'text-infra-muted'
            }`}>
              {trendValue}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-5xl font-bold text-white tracking-tight">
          {value}
        </span>
        {unit && (
          <span className="text-2xl text-infra-muted/50 font-semibold">
            {unit}
          </span>
        )}
      </div>
    </div>
  )
}

export default MetricCard
