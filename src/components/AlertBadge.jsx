function AlertBadge({ severity, count }) {
  const severityColors = {
    critical: 'bg-critical text-white',
    warning: 'bg-warning text-white',
    info: 'bg-primary-600 text-white',
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-bold ${severityColors[severity] || severityColors.info}`}>
      {severity.toUpperCase()} {count > 0 && `(${count})`}
    </span>
  )
}

export default AlertBadge
