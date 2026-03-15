import { useState, useEffect, useMemo } from 'react'
import DateRangePicker from '../components/DateRangePicker'
import HorizonSlider from '../components/HorizonSlider'
import ForecastChart from '../components/ForecastChart'
import { getGenerationData } from '../services/api'
import type { GenerationData } from '../types/generation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function Dashboard() {
  const [startDate, setStartDate] = useState('2024-01-01T00:00')
  const [endDate, setEndDate] = useState('2024-01-03T23:30')
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

  const { mae, rmse } = useMemo(() => {
    if (!data || data.length === 0) return { mae: null, rmse: null }
    let sumAbsoluteError = 0
    let sumSquaredError = 0
    let count = 0

    data.forEach(d => {
      if (d.actual != null && d.forecast != null) {
        const error = d.actual - d.forecast
        sumAbsoluteError += Math.abs(error)
        sumSquaredError += error * error
        count++
      }
    })

    if (count === 0) return { mae: null, rmse: null }

    return {
      mae: (sumAbsoluteError / count).toFixed(1),
      rmse: Math.sqrt(sumSquaredError / count).toFixed(1)
    }
  }, [data])

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-[1400px] mx-auto space-y-8 flex flex-col">
      <header className="space-y-2 mt-4 ml-2">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-primary">
          AeroCast Monitor
        </h1>
        <p className="text-muted-foreground text-lg font-medium">Next-generation wind forecasting and energy analysis.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1 space-y-6">
          <Card className="border border-black/5 shadow-2xl shadow-black/5 bg-white backdrop-blur-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl text-primary font-medium">Controls</CardTitle>
              <CardDescription>Adjust the time window and forecast horizon. Times are in UTC.</CardDescription>
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

          <div className="grid grid-cols-2 gap-4">
            <Card className="border border-black/5 shadow-xl shadow-black/5 bg-white backdrop-blur-xl rounded-2xl">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2 h-full">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">MAE</p>
                {loading ? (
                  <div className="h-9 w-16 bg-stone-100 animate-pulse rounded-md" />
                ) : (
                  <p className="text-3xl font-bold text-primary">{mae !== null ? `${mae}` : '--'} <span className="text-base font-normal text-muted-foreground">MW</span></p>
                )}
                <p className="text-xs text-muted-foreground text-center">Mean Absolute Error</p>
              </CardContent>
            </Card>
            <Card className="border border-black/5 shadow-xl shadow-black/5 bg-white backdrop-blur-xl rounded-2xl">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2 h-full">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">RMSE</p>
                {loading ? (
                  <div className="h-9 w-16 bg-stone-100 animate-pulse rounded-md" />
                ) : (
                  <p className="text-3xl font-bold text-primary">{rmse !== null ? `${rmse}` : '--'} <span className="text-base font-normal text-muted-foreground">MW</span></p>
                )}
                <p className="text-xs text-muted-foreground text-center">Root Mean Square Error</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="lg:col-span-2 border border-black/5 shadow-2xl shadow-black/5 bg-white backdrop-blur-xl rounded-2xl overflow-hidden min-h-[500px]">
          <CardContent className="p-6 h-full">
            <ForecastChart data={data} loading={loading} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
