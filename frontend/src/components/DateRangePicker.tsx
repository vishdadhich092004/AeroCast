import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DateRangePickerProps {
  startDate: string
  endDate: string
  setStartDate: (value: string) => void
  setEndDate: (value: string) => void
}

export default function DateRangePicker({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: DateRangePickerProps) {
  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="space-y-2">
        <Label htmlFor="start-datetime" className="text-muted-foreground font-medium">
          Start Time
        </Label>
        <Input
          id="start-datetime"
          type="datetime-local"
          value={startDate}
          step="1800"
          className="bg-white/60 backdrop-blur-sm border-white/50 shadow-sm focus-visible:ring-primary/50 transition-all rounded-xl"
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="end-datetime" className="text-muted-foreground font-medium">
          End Time
        </Label>
        <Input
          id="end-datetime"
          type="datetime-local"
          value={endDate}
          step="1800"
          className="bg-white/60 backdrop-blur-sm border-white/50 shadow-sm focus-visible:ring-primary/50 transition-all rounded-xl"
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
    </div>
  )
}
