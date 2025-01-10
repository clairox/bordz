import { CustomerResponse } from '@/types/api'
import { mapAddressResponseToAddress } from '.'

export const mapCustomerResponseToCustomer = (
    response: CustomerResponse
): Customer => {
    return {
        id: response.id,
        userId: response.userId,
        email: response.email,
        displayName: response.displayName,
        firstName: response.firstName,
        lastName: response.lastName,
        defaultAddress: response.defaultAddress
            ? mapAddressResponseToAddress(response.defaultAddress)
            : undefined,
        addresses: response.addresses.map(address =>
            mapAddressResponseToAddress(address)
        ),
        numberOfOrders: response.numberOfOrders,
        phone: response.phone ?? undefined,
    }
}
