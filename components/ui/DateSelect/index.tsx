import React, { useEffect, useState } from 'react'

import { CURRENT_YEAR, MIN_YEAR } from '@/utils/constants'
import { days, months, years } from './values'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../Select'

type DateSelectProps = {
    onChange: (value: Date) => void
    value?: Date
    minYear?: number
    maxYear?: number
}
const DateSelect: React.FC<DateSelectProps> = ({
    onChange,
    value,
    minYear = MIN_YEAR,
    maxYear = CURRENT_YEAR,
}) => {
    const [_value, setValue] = useState<Date | undefined>(value)

    const [selectedMonth, setSelectedMonth] = useState(
        _value ? months[_value.getMonth()] : 'Month'
    )
    const [selectedDay, setSelectedDay] = useState(
        _value?.getDate().toString() ?? 'Day'
    )
    const [selectedYear, setSelectedYear] = useState(
        _value?.getFullYear().toString() ?? 'Year'
    )

    const _years = [
        'Year',
        ...years.slice(
            years.indexOf(maxYear.toString()),
            years.indexOf(minYear.toString()) + 1
        ),
    ]

    useEffect(() => {
        if (selectedMonth && selectedDay && selectedYear) {
            const date = new Date(
                parseInt(selectedYear),
                months.indexOf(selectedMonth) - 1,
                parseInt(selectedDay)
            )

            if (date.toString() === value?.toString()) {
                return
            }

            if (date.toString() === 'Invalid Date') {
                return
            }

            onChange(date)
            setValue(date)
        }
    }, [selectedMonth, selectedDay, selectedYear, value, onChange])

    const onMonthChange = (month: string) => {
        if (month === '') {
            return
        }

        setSelectedMonth(month)
    }

    const onDayChange = (day: string) => {
        if (day === '') {
            return
        }

        setSelectedDay(day)
    }

    const onYearChange = (year: string) => {
        if (year === '') {
            return
        }

        setSelectedYear(year)
    }

    if (minYear < MIN_YEAR) {
        throw new Error(`minYear cannot be less than ${MIN_YEAR}`)
    }

    if (maxYear > CURRENT_YEAR) {
        throw new Error(`maxYear cannot be greater than the current year`)
    }

    return (
        <div className="flex gap-4">
            <Select value={selectedMonth} onValueChange={onMonthChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                    {months.map((month, idx) => (
                        <SelectItem key={idx} value={month}>
                            {month}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={selectedDay} onValueChange={onDayChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                    {days.map((day, idx) => (
                        <SelectItem key={idx} value={day}>
                            {day}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={onYearChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                    {_years.map((year, idx) => (
                        <SelectItem key={idx} value={year}>
                            {year}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default DateSelect
