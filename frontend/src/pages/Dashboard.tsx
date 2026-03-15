import { useState, useEffect } from 'react'
import DateRangePicker from '../components/DateRangePicker'
import HorizonSlider from '../components/HorizonSlider'
import ForecastChart from '../components/ForecastChart'
import { getGenerationData } from '../services/api'
import type { GenerationData } from '../types/generation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

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
    <div className="min-h-screen p-4 md:p-8 max-w-[1400px] mx-auto space-y-8 flex flex-col">
      <header className="space-y-2 mt-4 ml-2">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-primary">
          AeroCast Monitor
        </h1>
        <p className="text-muted-foreground text-lg font-medium">Next-generation wind forecasting and energy analysis.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <Card className="lg:col-span-1 border border-black/5 shadow-2xl shadow-black/5 bg-white backdrop-blur-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl text-primary font-medium">Controls</CardTitle>
            <CardDescription>Adjust the time window and forecast horizon.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
            <div className="pt-4 border-t border-black/5">
              <HorizonSlider horizon={horizon} setHorizon={setHorizon} />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border border-black/5 shadow-2xl shadow-black/5 bg-white backdrop-blur-xl rounded-2xl overflow-hidden min-h-[500px]">
          <CardContent className="p-6 h-full">
            <ForecastChart data={data} loading={loading} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
