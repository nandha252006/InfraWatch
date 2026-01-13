import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

function Chart({ data = [], type = 'line', dataKey, name, color = '#14b8a6', height = 300, showGrid = true }) {
  const ChartComponent = type === 'area' ? AreaChart : LineChart
  const DataComponent = type === 'area' ? Area : Line

  if (!data || data.length === 0) {
    return (
      <div className="w-full flex items-center justify-center" style={{ height }}>
        <p className="text-infra-muted">No data available</p>
      </div>
    )
  }

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#334155" />}
          <XAxis 
            dataKey="time" 
            stroke="#94a3b8"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#94a3b8"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1e293b', 
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#e2e8f0'
            }}
          />
          <Legend />
          <DataComponent 
            type="monotone" 
            dataKey={dataKey} 
            name={name}
            stroke={color} 
            fill={color}
            fillOpacity={type === 'area' ? 0.2 : 0}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
