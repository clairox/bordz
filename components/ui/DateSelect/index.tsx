import React, { useEffect, useState } from 'react'

import { CURRENT_YEAR, MIN_YEAR } from '@/utils/constants'
import { days, months, years } from './values'

type DateSelectProps = {
    onChange: (value: Date) => void
    value?: Date
    minYear?: number
    maxYear?: number
}
const DateSelect = React.forwardRef<HTMLDivElement, DateSelectProps>(
    ({ onChange, value, minYear = MIN_YEAR, maxYear = CURRENT_YEAR }, ref) => {
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

                if (date.toString() === 'Invalid Date') {
                    return
                }

                onChange(date)
                setValue(date)
            }
        }, [selectedMonth, selectedDay, selectedYear, onChange])

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
            <div ref={ref}>
                <select
                    value={selectedMonth}
                    onChange={e => {
                        onMonthChange(e.target.value)
                    }}
                >
                    {months.map((month, idx) => (
                        <option key={idx} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedDay}
                    onChange={e => {
                        onDayChange(e.target.value)
                    }}
                >
                    {days.map((day, idx) => (
                        <option key={idx} value={day}>
                            {day}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedYear}
                    onChange={e => {
                        onYearChange(e.target.value)
                    }}
                >
                    {_years.map((year, idx) => (
                        <option key={idx} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
)

DateSelect.displayName = 'DateSelect'

export default DateSelect
