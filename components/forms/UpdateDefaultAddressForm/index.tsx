'use client'

import { useRouter } from 'next/navigation'

import { useUpdateAddress } from '@/hooks/data/address'
import DataForm from '@/components/common/DataForm'
import UpdateDefaultAddressFormSchema from './schema'
import { AddressCard } from '@/components/features/Addresses'

type UpdateDefaultAddressFormProps = {
    addresses: Address[]
    defaultAddressId?: string
}

const UpdateDefaultAddressForm: React.FC<UpdateDefaultAddressFormProps> = ({
    addresses,
    defaultAddressId,
}) => {
    const { mutateAsync: updateAddress } = useUpdateAddress()
    const router = useRouter()

    return (
        <DataForm
            Schema={UpdateDefaultAddressFormSchema}
            defaultValues={{ defaultAddressId }}
            fieldData={[
                {
                    type: 'radioGroup',
                    name: 'defaultAddressId',
                    label: 'Choose your default address.',
                    items: addresses.map(address => ({
                        value: address.id,
                        label: <AddressCard address={address} />,
                    })),
                },
            ]}
            onSubmit={async data => {
                await updateAddress({
                    id: data.defaultAddressId,
                    isCustomerDefault: true,
                })
                router.push('/account/addresses')
            }}
            submitButtonContent="Save"
        />
    )
}

export default UpdateDefaultAddressForm
