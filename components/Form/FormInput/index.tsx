import { HTMLInputTypeAttribute, useMemo } from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

import { cn } from '@/utils/helpers'

type FormInputProps<T extends FieldValues> = {
    name: Path<T>
    label: string
    form: UseFormReturn<T, any, undefined>
    type?: HTMLInputTypeAttribute
    autoFocus?: boolean
}

const FormInput = <T extends FieldValues>({
    name,
    label,
    form,
    type,
    autoFocus = false,
}: FormInputProps<T>) => {
    const errors = useMemo(() => form.formState.errors, [form.formState.errors])

    return (
        <div className="flex flex-col gap-2 w-full">
            <label
                htmlFor={name}
                className={errors[name] ? 'text-red-500' : 'text-black'}
            >
                {label}
            </label>
            <input
                type={type || 'text'}
                id={name}
                {...form.register(name)}
                className={cn(
                    'border focus:outline-none focus:ring-2',
                    errors[name]
                        ? 'border-red-500 focus:ring-red-300'
                        : 'border-black'
                )}
                autoFocus={autoFocus}
            />
            {errors[name] && (
                <p className="text-red-500">{errors[name].message as string}</p>
            )}
        </div>
    )
}

export default FormInput
