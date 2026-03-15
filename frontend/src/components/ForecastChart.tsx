import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'
import type { GenerationData } from '../types/generation'

interface ForecastChartProps {
  data: GenerationData[]
  loading?: boolean
}

function formatTime(time: string): string {
  const d = new Date(time)
  const month = d.toLocaleString('en-US', { month: 'short' })
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const mins = String(d.getMinutes()).padStart(2, '0')
  return `${month} ${day} ${hours}:${mins}`
}

export default function ForecastChart({ data, loading = false }: ForecastChartProps) {
  if (loading) {
    return <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading data...</div>
  }

  if (!data || data.length === 0) {
    return <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No data available for selected range</div>
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <XAxis dataKey="time" tickFormatter={formatTime} />
        <YAxis />
        <Tooltip labelFormatter={formatTime} />
        <Legend />
        <Line type="monotone" dataKey="actual" name="Actual generation" stroke="#2563eb" dot={false} />
        <Line type="monotone" dataKey="forecast" name="Forecast generation" stroke="#22c55e" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
