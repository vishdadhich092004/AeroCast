import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

interface HorizonSliderProps {
  horizon: number
  setHorizon: (value: number) => void
}

export default function HorizonSlider({ horizon, setHorizon }: HorizonSliderProps) {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <div className="flex items-center justify-between">
        <Label htmlFor="horizon" className="text-muted-foreground font-medium">
          Forecast Horizon
        </Label>
        <span className="text-sm font-semibold text-primary">{horizon} h</span>
      </div>
      <Slider
        id="horizon"
        min={0}
        max={48}
        step={1}
        value={[horizon]}
        onValueChange={(vals) => setHorizon(typeof vals === 'number' ? vals : vals[0])}
        className="cursor-pointer"
      />
    </div>
  )
}
