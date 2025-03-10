'use client'

import ChangePasswordForm from '@/components/forms/UpdatePasswordForm'
import { Skeleton } from '@/components/ui/Skeleton'
import { useSessionCustomer } from '@/hooks/session'

export const ChangePasswordView = () => {
    const { isPending } = useSessionCustomer()
    return (
        <div className="p-8 w-[500px] border-r border-gray-400">
            {isPending ? <Fallback /> : <ChangePasswordForm />}
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
