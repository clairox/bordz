'use client'

import React from 'react'
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form'

import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/Form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/Select'
import { z } from 'zod'
import { FormLabelWithIndicator } from '../ui/FormLabelWithIndicator'

type FormSelectFieldProps<
    TShape extends z.ZodRawShape,
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
    schema: z.ZodObject<TShape>
    label?: string
    placeholder?: string
    options: FormSelectOption[]
}

const FormSelectField = <
    TShape extends z.ZodRawShape,
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    schema,
    label,
    placeholder,
    options,
}: FormSelectFieldProps<TShape, TFieldValues, TName>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && (
                        <FormLabelWithIndicator
                            required={!schema?.shape[name].isOptional()}
                        >
                            {label}
                        </FormLabelWithIndicator>
                    )}
                    <FormControl>
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {options.map((option, idx) => (
                                    <SelectItem
                                        key={`${idx}-${option.value}`}
                                        value={option.value}
                                    >
                                        {option.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export { FormSelectField }
