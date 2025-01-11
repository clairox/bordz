'use client'

import DataForm from '@/components/common/DataForm'
import UpdateAddressFormSchema from './schema'
import { states } from '@/utils'
import { useUpdateAddress } from '@/hooks/data/address'
import { useRouter } from 'next/navigation'

type UpdateAddressFormProps = {
    address: Address
    defaultAddressId?: string
}

const UpdateAddressForm: React.FC<UpdateAddressFormProps> = ({
    address,
    defaultAddressId,
}) => {
    const { mutateAsync: updateAddress } = useUpdateAddress()
    const router = useRouter()

    return (
        <DataForm
            Schema={UpdateAddressFormSchema}
            defaultValues={{
                fullName: address.fullName,
                line1: address.line1,
                line2: address.line2,
                city: address.city,
                state: address.state,
                postalCode: address.postalCode,
                phone: address.phone,
                isDefault: address.id === defaultAddressId,
            }}
            fieldData={[
                {
                    type: 'text',
                    name: 'fullName',
                    label: 'Name',
                    placeholder: 'Name',
                },
                {
                    type: 'text',
                    name: 'line1',
                    label: 'Line 1',
                    placeholder: 'Line 1',
                },
                {
                    type: 'text',
                    name: 'line2',
                    label: 'Line 2',
                    placeholder: 'Line 2',
                },
                {
                    type: 'text',
                    name: 'city',
                    label: 'City',
                    placeholder: 'City',
                },
                {
                    type: 'select',
                    name: 'state',
                    label: 'State',
                    placeholder: 'Select a state...',
                    options: states
                        .filter(state => state.code !== undefined)
                        .map(({ code, name }) => ({ value: code, name })),
                },
                {
                    type: 'text',
                    name: 'postalCode',
                    label: 'Postal Code',
                    placeholder: 'Postal Code',
                },
                {
                    type: 'text',
                    name: 'phone',
                    label: 'Phone',
                    placeholder: 'Phone',
                },
                {
                    type: 'checkbox',
                    name: 'isDefault',
                    label: 'Set as default address',
                },
            ]}
            onSubmit={async data => {
                const { isDefault, ...rest } = data
                await updateAddress({
                    id: address.id,
                    ...rest,
                    line2: rest.line2 ?? undefined,
                    phone: rest.phone ?? undefined,
                    countryCode: 'US',
                    isCustomerDefault: isDefault,
                })
                router.push('/account/addresses')
            }}
            submitButtonContent="Save"
        />
    )
}

export default UpdateAddressForm
