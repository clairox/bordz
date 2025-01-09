import { CustomerResponse } from '@/types/api'
import addressResponseToAddress from './addressResponseToAddress'

const customerResponseToCustomer = (data: CustomerResponse): Customer => {
    return {
        id: data.id,
        userId: data.userId,
        email: data.email,
        displayName: data.displayName,
        firstName: data.firstName,
        lastName: data.lastName,
        defaultAddress: data.defaultAddress
            ? addressResponseToAddress(data.defaultAddress)
            : undefined,
        addresses: data.addresses.map(address =>
            addressResponseToAddress(address)
        ),
        numberOfOrders: data.numberOfOrders,
        phone: data.phone ?? undefined,
    }
}

export default customerResponseToCustomer
