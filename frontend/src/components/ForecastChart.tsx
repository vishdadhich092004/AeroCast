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
import { Skeleton } from '@/components/ui/skeleton'

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
      <div className="w-full flex flex-col h-[500px] gap-4">
        <div className="w-full relative flex-1 flex flex-col mt-2">
          {/* Chart Area Skeleton */}
          <div className="flex-1 flex gap-4 px-2">
             {/* Y-axis labels */}
             <div className="flex flex-col justify-between h-full py-6 pr-2">
               <Skeleton className="h-3 w-10" />
               <Skeleton className="h-3 w-10" />
               <Skeleton className="h-3 w-10" />
               <Skeleton className="h-3 w-10" />
               <Skeleton className="h-3 w-10" />
             </div>
             {/* Graph Space */}
             <div className="flex-1 h-full flex flex-col justify-end gap-2">
                <Skeleton className="w-full h-full rounded-xl" />
                {/* X-axis labels */}
                <div className="flex justify-between w-full pt-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-16" />
                </div>
             </div>
          </div>
          {/* Legend Skeleton */}
          <div className="flex justify-center gap-6 pt-6 pb-2">
            <Skeleton className="h-4 w-32 rounded-full" />
            <Skeleton className="h-4 w-32 rounded-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full flex-1 flex flex-col min-h-[400px]">
        <div className="flex-1 flex flex-col items-center justify-center bg-stone-50/80 rounded-xl border border-stone-200/60 p-8 text-center m-2 shadow-sm">
          <p className="text-xl font-semibold text-stone-700 mb-2">No Generation Data</p>
          <p className="text-muted-foreground font-medium max-w-md">
            No data available for the selected date range. Run the backend ingestion script to load BMRS data into the database.
          </p>
        </div>
      </div>
    )
  }

  const hasForecastData = data.some((d) => d.forecast != null)

  return (
    <div className="w-full flex flex-col h-[500px] gap-4">
      {!hasForecastData && (
        <p className="text-sm text-stone-600 bg-stone-50 p-4 rounded-xl border border-stone-200 shadow-sm font-medium">
          No forecast data for this horizon. Try a smaller horizon or ensure data has been ingested.
        </p>
      )}
      <div className="w-full relative flex-1" style={{ minHeight: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" vertical={false} />
            <XAxis 
              dataKey="time" 
              tickFormatter={formatTime} 
              tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }}
              stroke="#e5e7eb"
              tickMargin={12}
            />
            <YAxis 
              tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }} 
              stroke="#e5e7eb"
              tickMargin={12}
            />
            <Tooltip
              isAnimationActive={false}
              labelFormatter={formatTime}
              formatter={(value: number, name: string) => [`${value} MW`, name]}
              contentStyle={{ borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 600, backgroundColor: 'var(--color-background)' }}
              cursor={{ stroke: 'var(--color-ring)', strokeWidth: 1, strokeDasharray: '4 4' }}
              shared={true}
            />
            <Legend wrapperStyle={{ paddingTop: '24px' }} iconType="circle" />
            <Line
              type="monotone"
              dataKey="actual"
              name="Actual Generation"
              stroke="var(--color-chart-1)"
              strokeWidth={4}
              dot={false}
              activeDot={{ r: 8, strokeWidth: 2, fill: "var(--color-chart-1)", stroke: "var(--color-background)" }}
              connectNulls
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="forecast"
              name={hasForecastData ? 'Forecast Generation' : 'Forecast (no data)'}
              stroke="var(--color-chart-2)"
              strokeWidth={3}
              dot={false}
              strokeDasharray="6 4"
              activeDot={{ r: 8, strokeWidth: 2, fill: "var(--color-chart-2)", stroke: "var(--color-background)" }}
              connectNulls
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
