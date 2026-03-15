import type { GenerationData } from '../types/generation'

interface ForecastChartProps {
  data: GenerationData[]
}

export default function ForecastChart({ data }: ForecastChartProps) {
  return (
    <div style={{ height: '400px', border: '1px solid #ddd' }}>
      Chart coming in next phase
    </div>
  )
}
