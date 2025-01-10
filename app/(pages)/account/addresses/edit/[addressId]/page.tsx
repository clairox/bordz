'use client'

import { useParams } from 'next/navigation'

import { useAddress } from '@/hooks/data/address'
import AddressForm from '@/components/forms/AddressForm'

const EditAddressPage = () => {
    const { addressId } = useParams()

    const { data: address, error, isPending } = useAddress(addressId as string)

    if (error) {
        // TODO: 404
        return <div>Something went wrong</div>
    }

    if (isPending) {
        return <div>Loading...</div>
    }

    // BUG: do something about this ownerId prop thing
    return <AddressForm existingAddress={address} />
}

export default EditAddressPage
