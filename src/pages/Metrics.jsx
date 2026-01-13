import { useState } from 'react'
import { BarChart3, Download, Calendar, Search } from 'lucide-react'
import Chart from '../components/Chart'
import { getServerMetrics } from '../services/dummyData'

function Metrics() {
  const [query, setQuery] = useState('cpu{server="web-server-01"}')
  const [timeRange, setTimeRange] = useState('1h')
  const [chartData, setChartData] = useState([])

  const handleQuery = () => {
    // Simulate query execution
    setChartData(getServerMetrics('1', timeRange))
  }

  const exportData = () => {
    const csv = [
      ['Time', 'Value'].join(','),
      ...chartData.map(d => [d.time, d.cpu].join(','))
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'metrics.csv'
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl border border-purple-500/30">
            <BarChart3 size={28} className="text-purple-400" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-3xl text-white mb-2">Metrics Analytics</h1>
            <p className="text-infra-muted">Query and analyze infrastructure metrics</p>
          </div>
        </div>
        <button
          onClick={exportData}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 
                   text-white rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          <Download size={20} />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Query Builder */}
      <div className="glass rounded-xl p-6 border border-infra-border bg-gradient-to-br from-purple-500/10 to-purple-600/5">
        <h3 className="font-medium text-white mb-4 flex items-center space-x-2">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <BarChart3 size={20} className="text-purple-400" />
          </div>
          <span>Query Builder</span>
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-infra-muted mb-2">
              PromQL Query
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-4 py-2 bg-infra-bg border border-infra-border rounded-lg 
                         text-white placeholder-infra-muted focus:outline-none focus:ring-2 
                         focus:ring-primary-500 font-mono text-sm"
                placeholder="cpu{server='web-server-01'}"
              />
              <button
                onClick={handleQuery}
                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                Execute
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar size={18} className="text-infra-muted" />
              <span className="text-sm text-infra-muted">Time Range:</span>
              {['1h', '6h', '24h', '7d', '30d'].map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setTimeRange(range)
                    handleQuery()
                  }}
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
        </div>
      </div>

      {/* Chart Results */}
      <div className="glass rounded-xl p-6 border border-infra-border">
        <h3 className="font-medium text-white mb-4">Query Results</h3>
        {chartData.length > 0 ? (
          <Chart 
            data={chartData} 
            dataKey="cpu" 
            name="CPU Usage"
            color="#14b8a6"
            height={400}
          />
        ) : (
          <div className="flex items-center justify-center h-64 text-infra-muted">
            <div className="text-center">
              <BarChart3 size={48} className="mx-auto mb-4 opacity-50" />
              <p>Enter a query and click Execute to view metrics</p>
            </div>
          </div>
        )}
      </div>

      {/* Query Examples */}
      <div className="glass rounded-xl p-6 border border-infra-border">
        <h3 className="font-medium text-white mb-4">Query Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'CPU Usage', query: 'cpu{server="web-server-01"}' },
            { label: 'Memory Usage', query: 'memory{server="web-server-01"}' },
            { label: 'Disk Usage', query: 'disk{server="web-server-01"}' },
            { label: 'Network I/O', query: 'network{server="web-server-01"}' },
          ].map((example, index) => (
            <button
              key={index}
              onClick={() => {
                setQuery(example.query)
                handleQuery()
              }}
              className="p-4 bg-infra-bg hover:bg-infra-surface border border-infra-border rounded-lg 
                       text-left transition-colors"
            >
              <div className="font-medium text-white mb-1">{example.label}</div>
              <div className="text-sm text-infra-muted font-mono">{example.query}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Metrics
