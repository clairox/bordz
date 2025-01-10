import { AddressResponse } from '@/types/api'

export const mapAddressResponseToAddress = (
    response: AddressResponse
): Address => {
    return {
        id: response.id,
        ownerId: response.ownerId ?? undefined,
        fullName: response.fullName,
        line1: response.line1,
        line2: response.line2 ?? undefined,
        city: response.city,
        state: response.state,
        countryCode: response.countryCode,
        postalCode: response.postalCode,
        phone: response.phone ?? undefined,
        formatted: response.formatted,
    }
}
