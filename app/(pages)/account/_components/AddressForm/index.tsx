'use client'

import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import AddressFormSchema from './schema'
import { useFormMessage } from '@/hooks'
import FormMessage from '@/components/FormMessage'
import ButtonAsync from '@/components/ButtonAsync'
import { FormInput, FormSelect } from '@/components/Form'
import states from './states'
import { useUpdateAddress } from '../../_hooks'
import { useCreateAddress } from '@/hooks'
import { useRouter } from 'next/navigation'

type FormData = z.infer<typeof AddressFormSchema>

type AddressFormProps = {
    existingAddress?: Address
    ownerId: string
}

const AddressForm: React.FC<AddressFormProps> = ({
    existingAddress,
    ownerId,
}) => {
    const form = useForm<FormData>({
        resolver: zodResolver(AddressFormSchema),
        defaultValues: {
            fullName: existingAddress?.fullName,
            line1: existingAddress?.line1,
            line2: existingAddress?.line2,
            city: existingAddress?.city,
            state: existingAddress?.state,
            postalCode: existingAddress?.postalCode,
            phone: existingAddress?.phone,
        },
    })

    const router = useRouter()

    const {
        mutate: createAddress,
        error: createAddressError,
        isPending: createAddressPending,
        isSuccess: createAddressSuccess,
    } = useCreateAddress()

    const {
        mutate: updateAddress,
        error: updateAddressError,
        isPending: updateAddressPending,
        isSuccess: updateAddressSuccess,
    } = useUpdateAddress()

    const { message, type, showMessage, clearMessage } = useFormMessage()

    // On successful address creation/update
    useEffect(() => {
        if (createAddressSuccess || updateAddressSuccess) {
            showMessage('Address updated successfully!', 'success')
            router.push('/account/addresses')
        }
    }, [createAddressSuccess, updateAddressSuccess, showMessage, router])

    // On erroneous address creation/update
    useEffect(() => {
        if (createAddressError || updateAddressError) {
            showMessage('Something went wrong.')
        }
    }, [createAddressError, updateAddressError, showMessage])

    const handleSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        clearMessage()

        if (existingAddress) {
            updateAddress({
                ...data,
                id: existingAddress?.id,
                countryCode: 'US',
            })
        } else {
            createAddress({
                ...data,
                line2: data.line2 || null,
                ownerId,
                countryCode: 'US',
            })
        }
    }

    return (
        <div>
            {message && <FormMessage message={message} type={type} />}
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-8"
                noValidate
            >
                <FormInput
                    name="fullName"
                    label="Name *"
                    form={form}
                    autoFocus
                />
                <FormInput name="line1" label="Line 1 *" form={form} />
                <FormInput name="line2" label="Line 2" form={form} />
                <FormInput name="city" label="City *" form={form} />
                <FormSelect name="state" label="State *" form={form}>
                    {states.map((state, idx) => {
                        return (
                            <option key={idx} value={state.code}>
                                {state.name}
                            </option>
                        )
                    })}
                </FormSelect>
                <FormInput
                    name="postalCode"
                    label="Postal Code *"
                    form={form}
                />
                <FormInput name="phone" label="Phone" form={form} />
                <ButtonAsync
                    loading={createAddressPending || updateAddressPending}
                    success={createAddressSuccess || updateAddressSuccess}
                >
                    {existingAddress ? 'Update address' : 'Add'}
                </ButtonAsync>
            </form>
        </div>
    )
}

export default AddressForm
