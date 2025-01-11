'use client'

import React from 'react'
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/Form'
import { Checkbox } from '../ui/Checkbox'

type FormCheckboxFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
    label: string
}

const FormCheckboxField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    label,
}: FormCheckboxFieldProps<TFieldValues, TName>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <div className="flex flex-row gap-4 items-start">
                            <Checkbox
                                id={field.value + '-checkbox'}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                            <FormLabel
                                htmlFor={field.value + '-checkbox'}
                                className="hover:cursor-pointer"
                            >
                                {label}
                            </FormLabel>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export { FormCheckboxField }
