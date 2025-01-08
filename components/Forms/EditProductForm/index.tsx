'use client'

import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import EditProductFormSchema from './schema'
import { useFormMessage } from '@/hooks'
import FormMessage from '@/components/FormMessage'
import FormInput from '@/components/Form/FormInput'
import SelectedAssets from '@/components/SelectedAssets'
import ButtonAsync from '@/components/ButtonAsync'

type FieldValues = z.infer<typeof EditProductFormSchema>

type EditProductFormProps = {
    product: Product
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product }) => {
    const form = useForm<FieldValues>({
        resolver: zodResolver(EditProductFormSchema),
        defaultValues: {
            title: product.title,
            featuredImage: product.featuredImage ?? undefined,
            price: product.price.toString(),
            isPublic: product.isPublic,
        },
    })

    const {
        mutate: updateProduct,
        error,
        status,
    } = useUpdateProduct(product.id)
    const {
        message,
        type: messageType,
        showMessage,
        clearMessage,
    } = useFormMessage()

    useEffect(() => {
        if (error) {
            showMessage('An unexpected error has occurred.')
        }
    }, [error, showMessage])

    useEffect(() => {
        if (status === 'success') {
            showMessage('Product updated successfully!')
        }
    }, [status, showMessage])

    const handleSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
        clearMessage()
        updateProduct({
            ...data,
            price: parseInt(data.price),
        })
    }

    return (
        <div>
            {message && <FormMessage type={messageType} message={message} />}
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-6"
                noValidate
            >
                <FormInput name="title" label="Title *" form={form} autoFocus />
                <SelectedAssets
                    assetPaths={
                        form.watch('featuredImage')
                            ? [form.watch('featuredImage')!]
                            : []
                    }
                    bucket="products"
                    accept="image/*"
                    select={path => form.setValue('featuredImage', path)}
                    deselect={() => form.setValue('featuredImage', undefined)}
                    max={1}
                />
                <FormInput
                    name="price"
                    label="Price (without decimal) *"
                    form={form}
                />
                <FormInput
                    type="checkbox"
                    name="isPublic"
                    label="Public"
                    form={form}
                />
                <ButtonAsync
                    type="submit"
                    loading={status === 'pending'}
                    success={status === 'success'}
                >
                    Save
                </ButtonAsync>
            </form>
        </div>
    )
}

export default EditProductForm
