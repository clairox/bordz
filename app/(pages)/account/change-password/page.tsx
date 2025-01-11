'use client'

import { AccountHeading, AccountSection } from '@/components/features/Account'
import ChangePasswordForm from '@/components/forms/UpdatePasswordForm'
import { Skeleton } from '@/components/ui/Skeleton'
import { useCustomer } from '@/context/CustomerContext'

const ChangePasswordPage = () => {
    const { isPending } = useCustomer()

    return (
        <div>
            <AccountHeading>Change Password</AccountHeading>
            <AccountSection>
                {isPending ? <Fallback /> : <ChangePasswordForm />}
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
        <div className="flex flex-col gap-2">
            <Skeleton className="w-[160px] h-[20px]" />
            <Skeleton className="h-[36px]" />
        </div>

        <Skeleton className="w-[100px] h-[36px]" />
    </div>
)

export default ChangePasswordPage
