'use client'

import React, { useState } from 'react'
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form'
import { z } from 'zod'
import { X } from '@phosphor-icons/react'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/Form'
import { FormLabelWithIndicator } from '../ui/FormLabelWithIndicator'
import { getZodSchemaShape } from '@/utils'
import { Input } from '../ui/Input'

type FormTextListFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
    label?: string
    placeholder?: string
    limit?: number
}

const FormTextListField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    label,
    placeholder,
    limit,
}: FormTextListFieldProps<TFieldValues, TName>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <TextList
                            {...field}
                            placeholder={placeholder}
                            limit={limit}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

type TextListProps = {
    value: string[]
    placeholder?: string
    limit?: number
    disabled?: boolean
    onChange: (value: string[]) => void
}

const TextList = React.forwardRef<HTMLDivElement, TextListProps>(
    ({ value, placeholder, limit, disabled = false, onChange }, ref) => {
        const [inputText, setInputText] = useState('')

        const handleRemoveItem = (index: number) => {
            const newValue = value.filter((_, idx) => idx !== index)
            onChange(newValue)
        }

        const handleAddItem = (text: string) => {
            if (!!limit && value.length >= limit) {
                return
            }

            const newValue = value.concat(text)
            onChange(newValue)

            setInputText('')
        }

        return (
            <div ref={ref}>
                <Input
                    value={inputText}
                    placeholder={placeholder}
                    disabled={disabled || (!!limit && value.length >= limit)}
                    onChange={e => setInputText(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            handleAddItem(inputText)
                        }
                    }}
                    formNoValidate
                />
                <ul className="flex flex-col gap-2 mt-4 pl-4">
                    {value.map((text, idx) => {
                        return (
                            <TextListItem
                                key={idx}
                                text={text}
                                removeItem={() => handleRemoveItem(idx)}
                            />
                        )
                    })}
                </ul>
            </div>
        )
    }
)

TextList.displayName = 'TextList'

type TextListItemProps = {
    text: string
    removeItem: () => void
}

const TextListItem: React.FC<TextListItemProps> = ({ text, removeItem }) => {
    const [showX, setShowX] = useState(false)

    return (
        <li>
            <button
                type="button"
                onClick={removeItem}
                onMouseEnter={() => setShowX(true)}
                onMouseLeave={() => setShowX(false)}
                className="flex items-center gap-2 hover:underline"
            >
                {text}
                {showX && <X size={18} weight="regular" />}
            </button>
        </li>
    )
}

export { FormTextListField }
