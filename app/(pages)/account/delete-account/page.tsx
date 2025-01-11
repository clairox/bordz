'use client'

import { useCustomer } from '@/context/CustomerContext'
import DeleteAccountForm from '@/components/forms/DeleteAccountForm'
import { AccountHeading, AccountSection } from '@/components/features/Account'
import { Skeleton } from '@/components/ui/Skeleton'

const DeleteAccountPage = () => {
    const { isPending } = useCustomer()

    return (
        <div>
            <AccountHeading>Delete Account</AccountHeading>
            <AccountSection>
                {isPending ? <Fallback /> : <DeleteAccountForm />}
            </AccountSection>
        </div>
    )
}

const Fallback = () => (
    <div className="flex flex-col gap-8 py-2">
        <div className="flex flex-col gap-2">
            <Skeleton className="w-[90px] h-[20px]" />
            <Skeleton className="h-[36px]" />
        </div>
        <Skeleton className="w-[150px] h-[36px]" />
    </div>
)

export default DeleteAccountPage
