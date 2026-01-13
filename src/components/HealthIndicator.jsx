function HealthIndicator({ status, size = 'md' }) {
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  }

  const statusColors = {
    healthy: 'bg-success',
    warning: 'bg-warning',
    critical: 'bg-critical',
    unknown: 'bg-infra-muted',
  }

  return (
    <div className="flex items-center space-x-2">
      <div className={`${sizes[size]} ${statusColors[status]} rounded-full animate-pulse`} />
      <span className="text-sm capitalize text-infra-muted">{status}</span>
    </div>
  )
}

export default HealthIndicator
