'use client'

import { useEffect, useState } from 'react'
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
import { omit } from 'lodash'

import { useFormMessage } from '@/hooks/forms'
import {
    FormAsyncSelectField,
    FormCheckboxField,
    FormCustomAsyncSelectField,
    FormDateSelectField,
    FormInputField,
    FormPasswordField,
    FormRadioGroupField,
    FormSelectField,
    FormTextareaField,
    FormTextListField,
} from '@/components/formControls'
import FormMessage from '@/components/ui/FormMessage'
import ButtonAsync from '@/components/ui/ButtonAsync'
import { SelectedAssets } from '@/components/features/Assets'
import { Form } from '@/components/ui/Form'
import { ButtonProps } from '@/components/ui/Button'
import { UNEXPECTED_ERROR_TEXT } from '@/utils/constants'
import { FormRadioGroupItem } from '@/types/forms'

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
          type: 'password'
          name: TName
          label: string
          placeholder?: string
          autoFocus?: boolean
      }
    | {
          type: 'textarea'
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
          type: 'radioGroup'
          name: TName
          label: string
          items: FormRadioGroupItem[]
      }
    | {
          type: 'select'
          name: TName
          label: string
          placeholder?: string
          options: FormSelectOption[]
      }
    | {
          type: 'dateSelect'
          name: TName
          label: string
          minYear?: number
          maxYear?: number
      }
    | {
          type: 'selectAsync'
          name: TName
          label: string
          placeholder?: string
          fetchOptions: () => Promise<FormSelectOption[]>
      }
    | {
          type: 'customSelectAsync'
          name: TName
          label: string
          placeholder?: string
          fetchOptions: () => Promise<FormSelectOption[]>
          addOption: (value: string) => Promise<FormSelectOption>
      }
    | {
          type: 'textlist'
          name: TName
          label: string
          placeholder?: string
          limit?: number
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
    Schema: TSchema | z.ZodEffects<TSchema>
    header?: string
    defaultValues?: DefaultValues<TFieldValues>
    fieldData: FieldDataDef<TFieldValues>[]
    onSubmit: (data: TFieldValues) => Promise<unknown>
    successMessage?: string
    submitButtonContent?: React.ReactNode
    submitButtonVariant?: ButtonProps['variant']
    getErrorMessage?: (error: unknown) => string | undefined
    resetOnSuccess?: boolean
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
    submitButtonContent = 'Save',
    submitButtonVariant = 'default',
    getErrorMessage,
    resetOnSuccess,
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

    useEffect(() => {
        if (resetOnSuccess && form.formState.isSubmitSuccessful) {
            form.reset()
        }
    }, [resetOnSuccess, form])

    const handleSubmit: SubmitHandler<TFieldValues> = async (
        data: TFieldValues
    ) => {
        clearMessage()
        setLoading(true)

        try {
            await onSubmit(data)
            if (successMessage) {
                showMessage(successMessage, 'success')
            }
            setSuccess(true)
        } catch (error) {
            console.error(error)
            if (getErrorMessage) {
                const errorMessage = getErrorMessage(error)
                if (errorMessage) {
                    showMessage(errorMessage)
                } else {
                    showMessage(UNEXPECTED_ERROR_TEXT)
                }
            } else {
                showMessage(UNEXPECTED_ERROR_TEXT)
            }
        }

        setLoading(false)
    }

    return (
        <div className="flex flex-col gap-6">
            {message && (
                <div className="mx-4">
                    <FormMessage type={messageType} message={message} />
                </div>
            )}
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
                                        {...omit(field, ['type'])}
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
                                        {...omit(field, ['type'])}
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
                                            {...omit(field, ['type'])}
                                        />
                                    )

                                case 'password':
                                    return (
                                        <FormPasswordField
                                            key={field.name}
                                            control={form.control}
                                            schema={Schema}
                                            {...omit(field, ['type'])}
                                        />
                                    )
                                case 'checkbox':
                                    return (
                                        <FormCheckboxField
                                            key={field.name}
                                            control={form.control}
                                            {...omit(field, ['type'])}
                                        />
                                    )
                                case 'radioGroup':
                                    return (
                                        <FormRadioGroupField
                                            key={field.name}
                                            control={form.control}
                                            schema={Schema}
                                            {...omit(field, ['type'])}
                                        />
                                    )
                                case 'textarea':
                                    return (
                                        <FormTextareaField
                                            key={field.name}
                                            control={form.control}
                                            schema={Schema}
                                            {...omit(field, ['type'])}
                                        />
                                    )
                                case 'textlist':
                                    return (
                                        <FormTextListField
                                            key={field.name}
                                            control={form.control}
                                            {...omit(field, ['type'])}
                                        />
                                    )
                                case 'select':
                                    return (
                                        <FormSelectField
                                            key={field.name}
                                            control={form.control}
                                            schema={Schema}
                                            {...omit(field, ['type'])}
                                        />
                                    )
                                case 'dateSelect':
                                    return (
                                        <FormDateSelectField
                                            key={field.name}
                                            control={form.control}
                                            schema={Schema}
                                            {...omit(field, ['type'])}
                                        />
                                    )
                                case 'selectAsync':
                                    return (
                                        <FormAsyncSelectField
                                            key={field.name}
                                            control={form.control}
                                            schema={Schema}
                                            {...omit(field, ['type'])}
                                        />
                                    )
                                case 'customSelectAsync':
                                    return (
                                        <FormCustomAsyncSelectField
                                            key={field.name}
                                            control={form.control}
                                            schema={Schema}
                                            {...omit(field, ['type'])}
                                        />
                                    )
                            }
                        }
                    })}
                    <ButtonAsync
                        variant={submitButtonVariant}
                        loading={loading}
                        success={success}
                        shouldReset={resetOnSuccess}
                        onReset={() => setSuccess(false)}
                    >
                        {submitButtonContent}
                    </ButtonAsync>
                </form>
            </Form>
        </div>
    )
}

export default DataForm
