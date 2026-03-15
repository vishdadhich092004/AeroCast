import { useState, useEffect } from 'react'
import DateRangePicker from '../components/DateRangePicker'
import HorizonSlider from '../components/HorizonSlider'
import ForecastChart from '../components/ForecastChart'
import { getGenerationData } from '../services/api'
import type { GenerationData } from '../types/generation'

export default function Dashboard() {
  const [startDate, setStartDate] = useState('2024-01-01')
  const [endDate, setEndDate] = useState('2024-01-03')
  const [horizon, setHorizon] = useState(4)
  const [data, setData] = useState<GenerationData[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getGenerationData(startDate, endDate, horizon)
      .then((result) => setData(result))
      .catch((err) => {
        console.error('Failed to load generation data:', err)
        setData([])
      })
      .finally(() => setLoading(false))
  }, [startDate, endDate, horizon])

  return (
    <main
      style={{
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <h1>AeroCast Wind Forecast Monitor</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <HorizonSlider horizon={horizon} setHorizon={setHorizon} />
      </div>

      <ForecastChart data={data} loading={loading} />
    </main>
  )
}
