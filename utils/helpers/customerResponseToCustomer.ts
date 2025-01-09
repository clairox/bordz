import { CustomerResponse } from '@/types/api'

const customerResponseToCustomer = async (
    customerResponse: CustomerResponse
): Promise<Customer> => {
    const customer = customerResponse as Partial<CustomerResponse>
    delete customer.createdAt
    delete customer.updatedAt

    return {
        ...(customer as Customer),
        phone: customer.phone ?? undefined,
    }
}

export default customerResponseToCustomer
