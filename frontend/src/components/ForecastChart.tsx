import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
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
    return (
      <section style={{ width: '100%' }}>
        <h2 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>Wind Generation Forecast</h2>
        <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Loading wind generation data...
        </div>
      </section>
    )
  }

  if (!data || data.length === 0) {
    return (
      <section style={{ width: '100%' }}>
        <h2 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>Wind Generation Forecast</h2>
        <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
          No data available for selected range. Run the ingestion script (npm run ingest in backend) to load BMRS data.
        </div>
      </section>
    )
  }

  const hasForecastData = data.some((d) => d.forecast != null)

  return (
    <section style={{ width: '100%', minWidth: 0 }}>
      <h2 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>Wind Generation Forecast</h2>
      {!hasForecastData && (
        <p style={{ marginBottom: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
          No forecast data for this horizon. Try a smaller horizon or ensure data has been ingested.
        </p>
      )}
      <div style={{ width: '100%', height: 400, minHeight: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" tickFormatter={formatTime} />
            <YAxis />
            <Tooltip
              labelFormatter={formatTime}
              formatter={(value: number, name: string) => [`${value} MW`, name]}
              contentStyle={{ padding: '10px 14px' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="actual"
              name="Actual Generation"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="forecast"
              name={hasForecastData ? 'Forecast Generation' : 'Forecast Generation (no data for horizon)'}
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
