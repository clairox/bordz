'use client'

import { FormEvent, useEffect, useState } from 'react'

import { useAuthQuery } from '@/context/AuthContext'
import AddressDisplay from '../../_components/AddressDisplay'
import { useUpdateAddress } from '../../_hooks'
import ButtonAsync from '@/components/ButtonAsync'
import { useRouter } from 'next/navigation'

const EditDefaultAddressPage = () => {
    const router = useRouter()

    const {
        customer: { data: customer, status: customerStatus },
    } = useAuthQuery()

    const { mutateAsync: updateAddress, status: updateStatus } =
        useUpdateAddress()

    const [defaultAddressId, setDefaultAddressId] = useState<string | null>(
        null
    )

    useEffect(() => {
        if (customerStatus === 'success' && customer?.defaultAddress?.address) {
            setDefaultAddressId(customer.defaultAddress.address.id)
        }
    }, [customerStatus, customer])

    useEffect(() => {
        if (updateStatus === 'success') {
            router.push('/account/addresses')
        }
    }, [updateStatus, router])

    if (customerStatus === 'pending') {
        return <div>Loading...</div>
    }

    if (!customer || customer.addresses.length === 0) {
        return <div>No addresses.</div>
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!defaultAddressId) {
            return
        }
        await updateAddress({ id: defaultAddressId, isCustomerDefault: true })
    }

    return (
        <form onSubmit={handleSubmit}>
            {customer.addresses.map(address => {
                return (
                    <div key={address.id} className="flex gap-4">
                        <input
                            id={address.id}
                            type="radio"
                            checked={defaultAddressId === address.id}
                            onChange={() => setDefaultAddressId(address.id)}
                        />
                        <label htmlFor={address.id}>
                            <AddressDisplay address={address} />
                        </label>
                    </div>
                )
            })}
            <ButtonAsync
                type="submit"
                loading={updateStatus === 'pending'}
                success={updateStatus === 'success'}
            >
                Set as default
            </ButtonAsync>
        </form>
    )
}

export default EditDefaultAddressPage
