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
        <Label htmlFor="start-date" className="text-muted-foreground font-medium">
          Start Date
        </Label>
        <Input
          id="start-date"
          type="date"
          value={startDate}
          className="bg-white/60 backdrop-blur-sm border-white/50 shadow-sm focus-visible:ring-primary/50 transition-all rounded-xl"
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="end-date" className="text-muted-foreground font-medium">
          End Date
        </Label>
        <Input
          id="end-date"
          type="date"
          value={endDate}
          className="bg-white/60 backdrop-blur-sm border-white/50 shadow-sm focus-visible:ring-primary/50 transition-all rounded-xl"
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
    </div>
  )
}
