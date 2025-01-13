'use client'

import { useState } from 'react'
import {
    DefaultValues,
    FieldPath,
    FieldPathValue,
    Path,
    SubmitHandler,
    useForm,
    UseFormReturn,
} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useFormMessage } from '@/hooks/forms'
import FormMessage from '@/components/ui/FormMessage'
import ButtonAsync from '@/components/ui/ButtonAsync'
import { SelectedAssets } from '../Assets'

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
          autoFocus?: boolean
      }
    | {
          type: 'textArea'
          name: TName
          label: string
          autoFocus?: boolean
      }
    | {
          type: 'checkbox'
          name: TName
          label: string
      }
    | {
          type: 'selectAsync'
          name: TName
          label: string
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

type AdminResourceDataFormProps<
    TSchema extends UnknownZodObject,
    TFieldValues extends z.infer<TSchema>,
> = {
    Schema: TSchema
    header: string
    defaultValues?: DefaultValues<TFieldValues>
    fieldData: FieldDataDef<TFieldValues>[]
    onSubmit: (data: TFieldValues) => Promise<unknown>
}

const AdminResourceDataForm = <
    TSchema extends UnknownZodObject,
    TFieldValues extends z.infer<TSchema>,
>({
    Schema,
    header,
    defaultValues,
    fieldData,
    onSubmit,
}: AdminResourceDataFormProps<TSchema, TFieldValues>) => {
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
            showMessage('Resource updated successfully!')
            setSuccess(true)
        } catch (error) {
            console.error(error)
            showMessage('An unexpected error has occurred.')
        }

        setLoading(false)
    }

    return (
        <div>
            <h1>{header}</h1>
            {message && <FormMessage type={messageType} message={message} />}
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
                                    assetPaths={fieldValue ? [fieldValue] : []}
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
                        return buildFormField(form, field)
                    }
                })}
                <ButtonAsync loading={loading} success={success}>
                    Save
                </ButtonAsync>
            </form>
        </div>
    )
}

const buildFormField = <TFieldValues extends object>(
    form: UseFormReturn<TFieldValues>,
    field: FieldDataDef<TFieldValues>
) => {
    switch (field.type) {
        case 'text':
            return <FormInput key={field.name} form={form} {...field} />
        case 'textArea':
            return <FormTextArea key={field.name} form={form} {...field} />
        case 'checkbox':
            return <FormInput key={field.name} form={form} {...field} />
        case 'selectAsync':
            return (
                <FormSelectWithAsyncOptions
                    key={field.name}
                    form={form}
                    {...field}
                />
            )
    }
}

export { AdminResourceDataForm }
