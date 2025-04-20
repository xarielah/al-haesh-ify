"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { he } from "date-fns/locale"

interface DatePickerProps {
    onChange: (date: Date) => void
    value: Date,
    futureOnly?: boolean;
    className?: string
}

export function DatePicker({ onChange, value, futureOnly = false, className = '' }: DatePickerProps) {
    const [date, setDate] = React.useState<Date>(value)

    React.useEffect(() => {
        onChange(date)
    }, [date])

    function setDateValue(newDate?: Date) {
        if (!newDate) return;
        if (futureOnly && newDate.getTime() < new Date().getTime())
            return;
        setDate(newDate)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: he }) : <span>בחרו תאריך</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDateValue}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
