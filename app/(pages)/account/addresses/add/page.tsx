'use client'

import { AccountHeading, AccountSection } from '@/components/features/Account'
import CreateAddressForm from '@/components/forms/CreateAddressForm'
import { Skeleton } from '@/components/ui/Skeleton'
import { useSessionCustomer } from '@/hooks/session'

const AddAddressPage = () => {
    const { data: customer, error, isPending } = useSessionCustomer()

    if (error) {
        throw error
    }

    return (
        <div>
            <AccountHeading>New Address</AccountHeading>
            <AccountSection>
                <div className="p-8 w-[500px] border-r border-gray-400">
                    {isPending ? (
                        <Fallback />
                    ) : (
                        <CreateAddressForm ownerId={customer!.id} />
                    )}
                </div>
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

export default AddAddressPage
