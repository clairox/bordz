'use client'

import React, { useState } from 'react'
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
import { Eye, EyeSlash } from '@phosphor-icons/react'
import { getZodSchemaShape } from '@/utils'

type FormPasswordFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
    schema: z.ZodTypeAny
    label?: string
    placeholder?: string
}

const FormPasswordField = <
    TShape extends z.ZodRawShape,
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    schema,
    label,
    placeholder,
}: FormPasswordFieldProps<TFieldValues, TName>) => {
    const shape = getZodSchemaShape<TShape>(schema)

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        if (isPasswordVisible) {
            return setIsPasswordVisible(false)
        } else {
            return setIsPasswordVisible(true)
        }
    }

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && (
                        <FormLabelWithIndicator
                            required={!shape[field.name].isOptional()}
                        >
                            {label}
                        </FormLabelWithIndicator>
                    )}

                    <FormControl>
                        <div className="relative flex items-center">
                            <Input
                                type={isPasswordVisible ? 'text' : 'password'}
                                placeholder={placeholder}
                                {...field}
                            />
                            <span
                                className="absolute right-[18px]  text-gray-700 cursor-pointer"
                                onClick={togglePasswordVisibility}
                                data-testid="showHideButton"
                            >
                                {isPasswordVisible ? (
                                    <Eye size={20} weight="fill" />
                                ) : (
                                    <EyeSlash size={20} weight="fill" />
                                )}
                            </span>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export { FormPasswordField }
