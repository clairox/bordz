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
import { z } from 'zod'
import { FormLabelWithIndicator } from '../ui/FormLabelWithIndicator'
import { getZodSchemaShape } from '@/utils'
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup'
import { FormRadioGroupItem } from '@/types/forms'

type FormRadioGroupFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
    schema: z.ZodTypeAny
    label: string
    items: FormRadioGroupItem[]
}

const FormRadioGroupField = <
    TShape extends z.ZodRawShape,
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    schema,
    label,
    items,
}: FormRadioGroupFieldProps<TFieldValues, TName>) => {
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
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            {items.map(item => (
                                <FormItem
                                    key={item.value}
                                    className="flex items-center gap-6"
                                >
                                    <FormControl>
                                        <RadioGroupItem value={item.value} />
                                    </FormControl>
                                    <FormLabel>{item.label}</FormLabel>
                                </FormItem>
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export { FormRadioGroupField }
