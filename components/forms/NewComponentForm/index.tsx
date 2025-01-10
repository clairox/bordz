'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import NewComponentFormSchema from './schema'
import { FormInput, FormTextArea } from '@/components/formControls'
import ButtonAsync from '@/components/ui/ButtonAsync'
import { useCreateComponent } from '@/hooks/data/component'
import FormSelectWithAsyncOptions from '@/components/formControls/FormSelectWithAsyncOptions'
import {
    fetchCategories,
    fetchColors,
    fetchSizes,
    fetchVendors,
} from '@/lib/api'
import { SelectedAssets } from '@/components/features/Assets'

type FormData = z.infer<typeof NewComponentFormSchema>

const NewComponentForm: React.FC = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(NewComponentFormSchema),
        defaultValues: {
            images: [],
        },
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

    const selectImage = (path: string) => {
        const images = form.getValues('images')
        form.setValue('images', images.concat(path))
    }

    const deselectImage = (path: string) => {
        const images = form.getValues('images')
        form.setValue(
            'images',
            images.filter(image => image !== path)
        )
    }

    const handleSubmit: SubmitHandler<FormData> = (data: FormData) => {
        createComponent({
            ...data,
            images: data.images || [],
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
                <SelectedAssets
                    assetPaths={form.watch('images')}
                    bucket="images"
                    folder="components"
                    accept="image/*"
                    select={selectImage}
                    deselect={deselectImage}
                />
                <SelectedAssets
                    assetPaths={
                        form.watch('model') ? [form.watch('model')!] : []
                    }
                    bucket="models"
                    accept=".fbx"
                    max={1}
                    select={path => form.setValue('model', path)}
                    deselect={() => form.setValue('model', undefined)}
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
