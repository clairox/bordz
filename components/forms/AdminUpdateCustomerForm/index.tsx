import { useUpdateCustomer } from '@/hooks/data/customer'
import AdminUpdateCustomerFormSchema from './schema'
import DataForm from '@/components/common/DataForm'
import { useRouter } from 'next/navigation'

type AdminUpdateCustomerFormProps = {
    customer: Customer
}

const AdminUpdateCustomerForm: React.FC<AdminUpdateCustomerFormProps> = ({
    customer,
}) => {
    const { mutateAsync: updateCustomer } = useUpdateCustomer()
    const router = useRouter()

    return (
        <DataForm
            Schema={AdminUpdateCustomerFormSchema}
            defaultValues={{
                email: customer.email,
                addresses: customer.addresses,
                firstName: customer.firstName,
                lastName: customer.lastName,
                phone: customer.phone,
            }}
            fieldData={[
                {
                    type: 'text',
                    name: 'email',
                    label: 'Email',
                },
                {
                    type: 'text',
                    name: 'firstName',
                    label: 'First name',
                },
                {
                    type: 'text',
                    name: 'lastName',
                    label: 'Last name',
                },
                {
                    type: 'text',
                    name: 'phone',
                    label: 'Phone',
                },
            ]}
            onSubmit={async data => {
                await updateCustomer({ userId: customer.userId, ...data })
                router.push('/admin/customers')
            }}
        />
    )
}

export default AdminUpdateCustomerForm
