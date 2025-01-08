import { useUpdateCustomer } from '@/hooks'
import UpdateCustomerFormSchema from './schema'
import AdminResourceDataForm from '@/components/AdminResourceDataForm'

type UpdateCustomerFormProps = {
    customer: Customer
}

const UpdateCustomerForm: React.FC<UpdateCustomerFormProps> = ({
    customer,
}) => {
    const { mutateAsync: updateCustomer } = useUpdateCustomer(customer.userId)

    return (
        <AdminResourceDataForm
            Schema={UpdateCustomerFormSchema}
            header={`Update customer`}
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
                    label: 'Email *',
                },
                {
                    type: 'text',
                    name: 'firstName',
                    label: 'First name *',
                },
                {
                    type: 'text',
                    name: 'lastName',
                    label: 'Last name *',
                },
                {
                    type: 'text',
                    name: 'phone',
                    label: 'Phone',
                },
            ]}
            onSubmit={data => updateCustomer(data)}
        />
    )
}

export default UpdateCustomerForm
