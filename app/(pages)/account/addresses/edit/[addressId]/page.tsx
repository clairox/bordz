'use client'

import { useParams } from 'next/navigation'
import { useAddress } from '../../../_hooks'
import AddressForm from '../../../_components/AddressForm'

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

    // TODO: Redirect to /account/addresses on successful submit
    return <AddressForm existingAddress={address} />
}

export default EditAddressPage
