'use client'

import { useRouter } from 'next/navigation'
import { Plus } from '@phosphor-icons/react'

import { Button } from '@/components/ui/Button'
import { useDeleteAddress } from '@/hooks/data/address'
import { AddressCard } from './AddressCard'

type AddressManagementListProps = {
    addresses: Address[]
}
export const AddressManagementList: React.FC<AddressManagementListProps> = ({
    addresses,
}) => {
    const { mutateAsync: deleteAddress } = useDeleteAddress()

    if (addresses.length > 0) {
        return (
            <div className="pl-8 w-1/2">
                <div className="flex justify-end mb-4">
                    <NewAddressButton />
                </div>
                {addresses.map(address => (
                    <AddressManagementCard
                        address={address}
                        deleteAddress={id => deleteAddress({ id })}
                        key={address.id}
                    />
                ))}
            </div>
        )
    } else {
        return (
            <div className="pl-8 w-1/2">
                <div className="flex flex-col gap-4 justify-center items-center h-full">
                    <p>No addresses saved.</p>
                    <NewAddressButton />
                </div>
            </div>
        )
    }
}

type AddressManagementCard = {
    address: Address
    deleteAddress: (id: string) => Promise<void>
}

const AddressManagementCard: React.FC<AddressManagementCard> = ({
    address,
    deleteAddress,
}) => {
    const router = useRouter()

    const handleEditNavigation = () =>
        router.push(`/account/addresses/edit/${address.id}`)
    const handleDeleteAddress = () => deleteAddress(address.id)

    return (
        <div key={address.id} className="flex justify-between items-start mb-3">
            <AddressCard address={address} />
            <div className="flex gap-2">
                <button onClick={handleEditNavigation}>Edit</button>
                <button onClick={handleDeleteAddress}>Delete</button>
            </div>
        </div>
    )
}

const NewAddressButton: React.FC = () => {
    const router = useRouter()

    const handleAddNavigation = () => router.push('/account/addresses/add')

    return (
        <Button
            onClick={handleAddNavigation}
            className="px-3 h-8 bg-green-600 hover:bg-green-700 text-base font-semibold"
        >
            New <Plus size={20} weight="bold" />
        </Button>
    )
}
