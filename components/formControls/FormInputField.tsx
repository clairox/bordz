'use client'

import React from 'react'
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form'

import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/Form'
import { Input } from '../ui/Input'
import { z } from 'zod'
import { FormLabelWithIndicator } from '../ui/FormLabelWithIndicator'

type FormInputFieldProps<
    TShape extends z.ZodRawShape,
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
    schema: z.ZodObject<TShape>
    label?: string
    placeholder?: string
}

const FormInputField = <
    TShape extends z.ZodRawShape,
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    schema,
    label,
    placeholder,
}: FormInputFieldProps<TShape, TFieldValues, TName>) => {
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
                        <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export { FormInputField }
