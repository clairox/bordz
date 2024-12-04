'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import NewComponentFormSchema from './schema'
import { FormInput, FormTextArea, FormFileUpload } from '@/components/Form'
import ButtonAsync from '@/components/ButtonAsync'
import useCreateComponent from './useCreateComponent'
import FormSelectWithAsyncOptions from '@/components/Form/FormSelectWithAsyncOptions'
import fetchAbsolute from '@/lib/fetchAbsolute'

type FormData = z.infer<typeof NewComponentFormSchema>

const NewComponentForm: React.FC = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(NewComponentFormSchema),
    })

    const router = useRouter()

    const {
        mutate: createComponent,
        isPending,
        isSuccess,
    } = useCreateComponent()

    useEffect(() => {
        if (isSuccess) {
            router.push('/admin/components')
        }
    }, [isSuccess, router])

    const fetchCategories = async (): Promise<Category[]> => {
        const response = await fetchAbsolute('/categories', {
            cache: 'no-cache',
        })
        if (!response.ok) {
            throw response
        }
        return await response.json()
    }

    const fetchVendors = async (): Promise<Vendor[]> => {
        const response = await fetchAbsolute('/vendors', { cache: 'no-cache' })
        if (!response.ok) {
            throw response
        }
        return await response.json()
    }

    const fetchSizes = async (): Promise<Size[]> => {
        const response = await fetchAbsolute('/sizes', { cache: 'no-cache' })
        if (!response.ok) {
            throw response
        }
        return await response.json()
    }

    const fetchColors = async (): Promise<Color[]> => {
        const response = await fetchAbsolute('/colors', { cache: 'no-cache' })
        if (!response.ok) {
            throw response
        }
        return await response.json()
    }

    const handleSubmit: SubmitHandler<FormData> = (data: FormData) => {
        createComponent({
            ...data,
            price: parseFloat(data.price),
            totalInventory: parseFloat(data.totalInventory),
        })
    }

    // TODO: Add specifications form input
    // TODO: Make the file uploading process more intuitive. It's too easy to forget to click upload
    return (
        <div>
            <h1>Add a new component</h1>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className=""
                noValidate
            >
                <FormInput name="title" label="Title *" form={form} autoFocus />
                <FormInput
                    name="price"
                    label="Price (without decimal) *"
                    form={form}
                />
                <FormFileUpload
                    name="image"
                    label="Image"
                    accept=".jpg,.png,.webp"
                    uploadBucket="images"
                    uploadPath="/components"
                    form={form}
                />
                <FormFileUpload
                    name="model"
                    label="Model"
                    accept=".fbx"
                    uploadBucket="models"
                    form={form}
                />
                <FormInput
                    name="totalInventory"
                    label="Quantity *"
                    form={form}
                />
                <FormTextArea
                    name="description"
                    label="Description"
                    form={form}
                />
                <FormSelectWithAsyncOptions
                    name="category"
                    label="Category *"
                    form={form}
                    fetch={async () => {
                        const categories = await fetchCategories()
                        return categories.map(category => ({
                            value: category.id,
                            name: category.label as string,
                        }))
                    }}
                />
                <FormSelectWithAsyncOptions
                    name="vendor"
                    label="Vendor *"
                    form={form}
                    fetch={async () => {
                        const vendors = await fetchVendors()
                        return vendors.map(vendor => ({
                            value: vendor.id,
                            name: vendor.name,
                        }))
                    }}
                />
                <FormSelectWithAsyncOptions
                    name="size"
                    label="Size *"
                    form={form}
                    fetch={async () => {
                        const sizes = await fetchSizes()
                        return sizes.map(size => ({
                            value: size.id,
                            name: size.label,
                        }))
                    }}
                />
                <FormSelectWithAsyncOptions
                    name="color"
                    label="Color *"
                    form={form}
                    fetch={async () => {
                        const colors = await fetchColors()
                        return colors.map(color => ({
                            value: color.id,
                            name: color.label,
                        }))
                    }}
                />
                <ButtonAsync
                    type="submit"
                    loading={isPending}
                    success={isSuccess}
                >
                    Add
                </ButtonAsync>
            </form>
        </div>
    )
}

export default NewComponentForm
