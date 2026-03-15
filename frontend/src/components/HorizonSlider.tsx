interface HorizonSliderProps {
  horizon: number
  setHorizon: (value: number) => void
}

export default function HorizonSlider({ horizon, setHorizon }: HorizonSliderProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
      <label htmlFor="horizon">Forecast horizon (hours)</label>
      <input
        id="horizon"
        type="range"
        min={0}
        max={48}
        value={horizon}
        onChange={(e) => setHorizon(Number(e.target.value))}
      />
      <span>{horizon} h</span>
    </div>
  )
}
