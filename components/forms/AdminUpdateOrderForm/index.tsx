'use client'

import { useUpdateOrder } from '@/hooks/data/order'
import UpdateOrderSchema from './schema'
import { useRouter } from 'next/navigation'
import DataForm from '@/components/common/DataForm'

type AdminUpdateOrderFormProps = {
    order: Order
}

const AdminUpdateOrderForm: React.FC<AdminUpdateOrderFormProps> = ({
    order,
}) => {
    const { mutateAsync: updateOrder } = useUpdateOrder(order.id)
    const router = useRouter()

    return (
        <DataForm
            Schema={UpdateOrderSchema}
            defaultValues={{
                email: order.email,
                phone: order.phone,
                totalShipping: order.totalShipping.toString(),
                totalTax: order.totalTax.toString(),
            }}
            fieldData={[
                {
                    type: 'text',
                    name: 'email',
                    label: 'Email',
                    autoFocus: true,
                },
                {
                    type: 'text',
                    name: 'phone',
                    label: 'Phone',
                },
                {
                    type: 'text',
                    name: 'totalShipping',
                    label: 'Total shipping (without decimal)',
                },
                {
                    type: 'text',
                    name: 'totalTax',
                    label: 'Total tax (without decimal)',
                },
            ]}
            onSubmit={async data => {
                await updateOrder({
                    ...data,
                    totalShipping: parseInt(data.totalShipping),
                    totalTax: parseInt(data.totalTax),
                })
                router.push('/admin/orders')
            }}
        />
    )
}

export default AdminUpdateOrderForm
