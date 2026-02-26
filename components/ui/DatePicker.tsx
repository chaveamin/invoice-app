"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value?: Date | string;
  onChange?: (date?: Date) => void;
  className?: string;
}

export default function DatePicker({
  value,
  onChange,
  className,
}: DatePickerProps) {
  const dateValue = typeof value === "string" ? new Date(value) : value;

  const formattedDate = dateValue
    ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "long" }).format(dateValue)
    : "انتخاب تاریخ";

  return (
    <div className={cn("w-full flex justify-center items-center", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full h-9 px-3 py-[7px] justify-start text-right font-normal",
              !dateValue && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="ml-2 h-4 w-4" />
            {formattedDate}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateValue}
            onSelect={onChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
