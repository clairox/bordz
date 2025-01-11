'use client'

import { useState } from 'react'
import {
    DefaultValues,
    FieldPath,
    FieldPathValue,
    Path,
    SubmitHandler,
    useForm,
} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useFormMessage } from '@/hooks/forms'
import {
    FormCheckboxField,
    FormInputField,
    FormSelectField,
} from '@/components/formControls'
import FormMessage from '@/components/ui/FormMessage'
import ButtonAsync from '@/components/ui/ButtonAsync'
import { SelectedAssets } from '@/components/features/Assets'
import { Form } from '@/components/ui/Form'

type UnknownZodObject = z.ZodObject<
    z.ZodRawShape,
    z.UnknownKeysParam,
    z.ZodTypeAny
>

type FieldDataDef<TFieldValues extends object, TName = Path<TFieldValues>> =
    | {
          type: 'text'
          name: TName
          label: string
          placeholder?: string
          autoFocus?: boolean
      }
    | {
          type: 'textArea'
          name: TName
          label: string
          placeholder?: string
          autoFocus?: boolean
      }
    | {
          type: 'checkbox'
          name: TName
          label: string
      }
    | {
          type: 'select'
          name: TName
          label: string
          placeholder?: string
          options: FormSelectOption[]
      }
    | {
          type: 'selectAsync'
          name: TName
          label: string
          placeholder?: string
          fetch: () => Promise<FormSelectOption[]>
      }
    | {
          type: 'assets'
          name: TName
          label: string
          bucket: string
          folder?: string
          accept?: string
          max?: number
      }

type DataFormProps<
    TSchema extends UnknownZodObject,
    TFieldValues extends z.infer<TSchema>,
> = {
    Schema: TSchema
    header?: string
    defaultValues?: DefaultValues<TFieldValues>
    fieldData: FieldDataDef<TFieldValues>[]
    onSubmit: (data: TFieldValues) => Promise<unknown>
    successMessage?: string
    submitButtonContent?: React.ReactNode
}

const DataForm = <
    TSchema extends UnknownZodObject,
    TFieldValues extends z.infer<TSchema>,
>({
    Schema,
    defaultValues,
    fieldData,
    onSubmit,
    successMessage,
    submitButtonContent,
}: DataFormProps<TSchema, TFieldValues>) => {
    const form = useForm<TFieldValues>({
        resolver: zodResolver(Schema),
        defaultValues,
    })

    const {
        message,
        type: messageType,
        showMessage,
        clearMessage,
    } = useFormMessage()

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit: SubmitHandler<TFieldValues> = async (
        data: TFieldValues
    ) => {
        clearMessage()
        setLoading(true)

        try {
            await onSubmit(data)
            if (successMessage) {
                showMessage(successMessage)
            }
            setSuccess(true)
        } catch (error) {
            console.error(error)
            showMessage('An unexpected error has occurred.')
        }

        setLoading(false)
    }

    return (
        <div>
            {message && <FormMessage type={messageType} message={message} />}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="flex flex-col gap-6"
                    noValidate
                >
                    {fieldData.map(field => {
                        if (field.type === 'assets') {
                            const fieldValue = form.getValues(field.name)
                            type TFieldPathValue = FieldPathValue<
                                TFieldValues,
                                FieldPath<TFieldValues>
                            >
                            if (Array.isArray(fieldValue)) {
                                return (
                                    <SelectedAssets
                                        key={form.watch(field.name)}
                                        assetPaths={fieldValue}
                                        select={path => {
                                            form.setValue(
                                                field.name,
                                                fieldValue.concat(path)
                                            )
                                        }}
                                        deselect={path => {
                                            form.setValue(
                                                field.name,
                                                fieldValue.filter(
                                                    (item: TFieldPathValue) =>
                                                        item !== path
                                                )
                                            )
                                        }}
                                        {...field}
                                    />
                                )
                            } else {
                                return (
                                    <SelectedAssets
                                        key={form.watch(field.name)}
                                        assetPaths={
                                            fieldValue ? [fieldValue] : []
                                        }
                                        select={path =>
                                            form.setValue(
                                                field.name,
                                                path as TFieldPathValue
                                            )
                                        }
                                        deselect={() =>
                                            form.setValue(
                                                field.name,
                                                undefined as TFieldPathValue
                                            )
                                        }
                                        {...field}
                                    />
                                )
                            }
                        } else {
                            switch (field.type) {
                                case 'text':
                                    return (
                                        <FormInputField
                                            key={field.name}
                                            control={form.control}
                                            schema={Schema}
                                            name={field.name}
                                            label={field.label}
                                            placeholder={field.placeholder}
                                        />
                                    )
                                case 'checkbox':
                                    return (
                                        <FormCheckboxField
                                            key={field.name}
                                            control={form.control}
                                            name={field.name}
                                            label={field.label}
                                        />
                                    )
                                case 'select':
                                    return (
                                        <FormSelectField
                                            key={field.name}
                                            control={form.control}
                                            schema={Schema}
                                            name={field.name}
                                            label={field.label}
                                            placeholder={field.placeholder}
                                            options={field.options}
                                        />
                                    )
                            }
                        }
                    })}
                    <ButtonAsync loading={loading} success={success}>
                        {submitButtonContent ?? 'Save'}
                    </ButtonAsync>
                </form>
            </Form>
        </div>
    )
}

export default DataForm
