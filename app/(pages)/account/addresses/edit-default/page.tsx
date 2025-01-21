'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { useUpdateAddress } from '@/hooks/data/address'
import { AddressCard } from '@/components/features/Addresses'
import ButtonAsync from '@/components/ui/ButtonAsync'
import { useCustomer } from '@/context/CustomerContext'
import { AccountHeading, AccountSection } from '@/components/features/Account'

const EditDefaultAddressPage = () => {
    const router = useRouter()

    const { data: customer, status: customerStatus } = useCustomer()

    const [defaultAddressId, setDefaultAddressId] = useState<string | null>(
        null
    )

    const { mutateAsync: updateAddress, status: updateStatus } =
        useUpdateAddress()

    useEffect(() => {
        if (customerStatus === 'success' && customer?.defaultAddress) {
            setDefaultAddressId(customer.defaultAddress.id)
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
        <div>
            <AccountHeading>Update default address</AccountHeading>
            <AccountSection>
                <div className="p-8 w-[500px] border-r border-gray-400">
                    <form onSubmit={handleSubmit}>
                        {customer.addresses.map(address => {
                            return (
                                <div key={address.id} className="flex gap-4">
                                    <input
                                        id={address.id}
                                        type="radio"
                                        checked={
                                            defaultAddressId === address.id
                                        }
                                        onChange={() =>
                                            setDefaultAddressId(address.id)
                                        }
                                    />
                                    <label htmlFor={address.id}>
                                        <AddressCard address={address} />
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
                </div>
            </AccountSection>
        </div>
    )
}

export default EditDefaultAddressPage
