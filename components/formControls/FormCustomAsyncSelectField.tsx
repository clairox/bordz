'use client'

import React from 'react'
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form'
import { z } from 'zod'

import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/Form'
import { FormLabelWithIndicator } from '../ui/FormLabelWithIndicator'
import { getZodSchemaShape } from '@/utils'
import { CustomOptionSelect } from '../ui/CustomOptionSelect'

type FormCustomAsyncSelectFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
    schema: z.ZodTypeAny
    label?: string
    placeholder?: string
    fetchOptions: () => Promise<FormSelectOption[]>
    addOption: (value: string) => Promise<FormSelectOption>
}

const FormCustomAsyncSelectField = <
    TShape extends z.ZodRawShape,
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    schema,
    label,
    placeholder,
    fetchOptions,
    addOption,
}: FormCustomAsyncSelectFieldProps<TFieldValues, TName>) => {
    const shape = getZodSchemaShape<TShape>(schema)

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && (
                        <FormLabelWithIndicator
                            required={!shape[name].isOptional()}
                        >
                            {label}
                        </FormLabelWithIndicator>
                    )}
                    <FormControl>
                        <CustomOptionSelect
                            {...field}
                            id={name}
                            placeholder={placeholder}
                            fetchOptions={fetchOptions}
                            addOption={addOption}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export { FormCustomAsyncSelectField }
