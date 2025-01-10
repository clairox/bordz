'use client'

import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import EditComponentFormSchema from './schema'
import { useUpdateComponent } from '@/hooks/data/component'
import { useFormMessage } from '@/hooks/forms'
import FormInput from '@/components/formControls/FormInput'
import FormTextArea from '@/components/formControls/FormTextArea'
import FormSelectWithAsyncOptions from '@/components/formControls/FormSelectWithAsyncOptions'
import {
    fetchCategories,
    fetchColors,
    fetchSizes,
    fetchVendors,
} from '@/lib/api'
import ButtonAsync from '@/components/ui/ButtonAsync'
import FormMessage from '@/components/ui/FormMessage'
import { SelectedAssets } from '@/components/features/Assets'

type FieldValues = z.infer<typeof EditComponentFormSchema>

type EditComponentFormProps = {
    component: Component
}

const EditComponentForm: React.FC<EditComponentFormProps> = ({ component }) => {
    const form = useForm<FieldValues>({
        resolver: zodResolver(EditComponentFormSchema),
        defaultValues: {
            title: component.title,
            price: component.price.toString(),
            images: component.images || [],
            model: component.model,
            description: component.description,
            specifications: component.specifications,
            totalInventory: component.totalInventory.toString(),
            category: component.category.id,
            vendor: component.vendor.id,
            size: component.size.id,
            color: component.color.id,
        },
    })

    const {
        mutate: updateComponent,
        error,
        status,
    } = useUpdateComponent(component.id)

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
            showMessage('Component updated successfully!')
        }
    }, [status, showMessage])

    const selectImage = (path: string) => {
        console.log('Selecting image...')
        const images = form.getValues('images')
        console.log('Current images:', images)
        form.setValue('images', images.concat(path))
        console.log('Image selected')
        console.log('New images:', form.getValues('images'))
    }

    const deselectImage = (path: string) => {
        const images = form.getValues('images')
        form.setValue(
            'images',
            images.filter(image => image !== path)
        )
    }

    const handleSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
        clearMessage()
        updateComponent({
            ...data,
            price: parseInt(data.price),
            totalInventory: parseInt(data.totalInventory),
        })
    }

    // TODO: Add specifications
    // TODO: Add model
    return (
        <div>
            {message && <FormMessage type={messageType} message={message} />}
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-6"
                noValidate
            >
                <FormInput name="title" label="Title *" form={form} autoFocus />
                <FormInput
                    name="price"
                    label="Price (without decimal) *"
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
                <SelectedAssets
                    assetPaths={form.watch('images')}
                    bucket="images"
                    folder="components"
                    accept="accept/*"
                    select={selectImage}
                    deselect={deselectImage}
                />
                <SelectedAssets
                    assetPaths={
                        form.watch('model') ? [form.watch('model')!] : []
                    }
                    bucket="models"
                    accept=".fbx"
                    select={path => form.setValue('model', path)}
                    deselect={() => form.setValue('model', undefined)}
                    max={1}
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
                    loading={status === 'pending'}
                    success={status === 'success'}
                >
                    Save
                </ButtonAsync>
            </form>
        </div>
    )
}

export default EditComponentForm
