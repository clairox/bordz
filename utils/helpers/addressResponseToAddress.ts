import { AddressResponse } from '@/types/api'

const addressResponseToAddress = (data: AddressResponse): Address => {
    return {
        id: data.id,
        ownerId: data.ownerId ?? undefined,
        fullName: data.fullName,
        line1: data.line1,
        line2: data.line2 ?? undefined,
        city: data.city,
        state: data.state,
        countryCode: data.countryCode,
        postalCode: data.postalCode,
        phone: data.phone ?? undefined,
        formatted: data.formatted,
    }
}

export default addressResponseToAddress
