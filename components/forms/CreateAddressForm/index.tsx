'use client'

import DataForm from '@/components/common/DataForm'
import CreateAddressFormSchema from './schema'
import { states } from '@/utils'
import { useCreateAddress } from '@/hooks/data/address'
import { useRouter } from 'next/navigation'

type CreateAddressFormProps = {
    ownerId: string
}

const CreateAddressForm: React.FC<CreateAddressFormProps> = ({ ownerId }) => {
    const { mutateAsync: createAddress } = useCreateAddress()
    const router = useRouter()

    return (
        <DataForm
            Schema={CreateAddressFormSchema}
            defaultValues={{
                fullName: '',
                line1: '',
                line2: '',
                city: '',
                state: '',
                postalCode: '',
                phone: '',
                isDefault: false,
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
                await createAddress({
                    ...rest,
                    line2: rest.line2 ?? undefined,
                    phone: rest.phone ?? undefined,
                    ownerId,
                    countryCode: 'US',
                    isCustomerDefault: isDefault,
                })
                router.push('/account/addresses')
            }}
            submitButtonContent="Save"
        />
    )
}

export default CreateAddressForm
