import { useMemo } from 'react'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'

import DateSelect from '../../ui/DateSelect'

type FormDateSelectProps<T extends FieldValues> = {
    name: Path<T>
    label: string
    form: UseFormReturn<T, any, undefined>
    maxYear?: number
}

const FormDateSelect = <T extends FieldValues>({
    name,
    label,
    form,
    maxYear,
}: FormDateSelectProps<T>) => {
    const errors = useMemo(() => form.formState.errors, [form.formState.errors])

    return (
        <div className="flex flex-col gap-2 w-full">
            <label
                htmlFor={name}
                className={errors[name] ? 'text-red-500' : 'text-black'}
            >
                {label}
            </label>
            <DateSelect
                {...form.register(name)}
                onChange={date => {
                    form.setValue(name, date as PathValue<T, Path<T>>)
                }}
                maxYear={maxYear}
                // className={cn(
                //     'border focus:outline-none focus:ring-2',
                //     errors[name]
                //         ? 'border-red-500 focus:ring-red-300'
                //         : 'border-black'
                // )}
            />
            {/* {errors[name] && ( */}
            {/*     <p className="text-red-500">{errors[name].message as string}</p> */}
            {/* )} */}
        </div>
    )
}

export default FormDateSelect
