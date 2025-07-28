import * as React from "react"
import UnStyledDatePicker, {
  DateObject,
  DatePickerProps as UnStyledDatePickerProps,
} from "react-multi-date-picker"
import { cn } from "@/lib/utils"
import persianLocal from "react-date-object/locales/persian_fa"
import persian from "react-date-object/calendars/persian"

interface DatePickerProps extends UnStyledDatePickerProps {
  value?: string
  onChange?: (value: DateObject) => void
  className?: string
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("w-full flex justify-center items-center", className)}>
        <UnStyledDatePicker
          value={props.value}
          onChange={props.onChange}
          calendar={persian}
          locale={persianLocal}
          portal
          format="YYYY/MM/DD"
          inputClass={cn(
            "w-full h-9 px-3 py-[7px] rounded-md border border-input bg-transparent text-base text-center shadow-xs outline-none",
            "focus:border-ring focus:ring-2 focus:ring-ring/50",
            "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          )}
          containerClassName="w-full"
          {...props}
        />
      </div>
    )
  }
)

DatePicker.displayName = "DatePicker"

export default DatePicker
