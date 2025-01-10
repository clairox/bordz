'use client'

import { AdminResourceDataForm } from '@/components/features/Admin'
import { useUpdateOrder } from '@/hooks/data/order'
import UpdateOrderSchema from './schema'

type UpdateOrderFormProps = {
    order: Order
}

const UpdateOrderForm: React.FC<UpdateOrderFormProps> = ({ order }) => {
    const { mutateAsync: updateOrder } = useUpdateOrder(order.id)

    return (
        <AdminResourceDataForm
            Schema={UpdateOrderSchema}
            header={'Edit order no: ' + order.id}
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
                    label: 'Email *',
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
                    label: 'Total shipping (without decimal) *',
                },
                {
                    type: 'text',
                    name: 'totalTax',
                    label: 'Total tax (without decimal) *',
                },
            ]}
            onSubmit={data =>
                updateOrder({
                    ...data,
                    totalShipping: parseInt(data.totalShipping),
                    totalTax: parseInt(data.totalTax),
                })
            }
        />
    )
}

export default UpdateOrderForm
