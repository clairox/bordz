'use client'

import { AccountHeading, AccountSection } from '@/components/features/Account'
import UpdatePersonalDetailsForm from '@/components/forms/UpdatePersonalDetailsForm'
import { Skeleton } from '@/components/ui/Skeleton'
import { useCustomer } from '@/context/CustomerContext'

const PersonalDetailsPage = () => {
    const { data: customer, error, isPending } = useCustomer()

    if (error) {
        throw error
    }

    return (
        <div>
            <AccountHeading>Personal Details</AccountHeading>
            <AccountSection>
                {isPending ? (
                    <Fallback />
                ) : (
                    <UpdatePersonalDetailsForm customer={customer!} />
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
        <Skeleton className="w-[100px] h-[36px]" />
    </div>
)

export default PersonalDetailsPage
