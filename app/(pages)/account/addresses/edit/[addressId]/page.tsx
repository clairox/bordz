'use client'

import { useParams } from 'next/navigation'

import { useAddress } from '@/hooks/data/address'
import UpdateAddressForm from '@/components/forms/UpdateAddressForm'
import { useCustomer } from '@/context/CustomerContext'
import { AccountHeading, AccountSection } from '@/components/features/Account'
import { Skeleton } from '@/components/ui/Skeleton'

const EditAddressPage = () => {
    const { addressId } = useParams<Record<string, string>>()

    const {
        data: address,
        error: addressError,
        isPending: isAddressPending,
    } = useAddress(addressId)
    const {
        data: customer,
        error: customerError,
        isPending: isCustomerPending,
    } = useCustomer()

    if (addressError || customerError) {
        throw addressError || customerError
    }

    return (
        <div>
            <AccountHeading>Edit Address</AccountHeading>
            <AccountSection>
                {isAddressPending || isCustomerPending ? (
                    <Fallback />
                ) : (
                    <UpdateAddressForm
                        address={address}
                        defaultAddressId={customer?.defaultAddress?.id}
                    />
                )}
            </AccountSection>
        </div>
    )
}

const Fallback = () => (
    <div className="flex flex-col gap-8 py-2">
        <div className="flex flex-col gap-2">
            <Skeleton className="w-[80px] h-[20px]" />
            <Skeleton className="h-[36px]" />
        </div>
        <div className="flex flex-col gap-2">
            <Skeleton className="w-[70px] h-[20px]" />
            <Skeleton className="h-[36px]" />
        </div>
        <div className="flex flex-col gap-2">
            <Skeleton className="w-[70px] h-[20px]" />
            <Skeleton className="h-[36px]" />
        </div>
        <div className="flex flex-col gap-2">
            <Skeleton className="w-[60px] h-[20px]" />
            <Skeleton className="h-[36px]" />
        </div>
        <div className="flex flex-col gap-2">
            <Skeleton className="w-[90px] h-[20px]" />
            <Skeleton className="h-[36px]" />
        </div>
        <div className="flex flex-col gap-2">
            <Skeleton className="w-[120px] h-[20px]" />
            <Skeleton className="h-[36px]" />
        </div>
        <div className="flex flex-col gap-2">
            <Skeleton className="w-[90px] h-[20px]" />
            <Skeleton className="h-[36px]" />
        </div>
        <Skeleton className="w-[100px] h-[36px]" />
    </div>
)

export default EditAddressPage
