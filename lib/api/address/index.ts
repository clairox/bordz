import {
    AddressCreateArgs,
    AddressResponse,
    AddressUpdateArgs,
} from '@/types/api'
import fetchAbsolute from '../../fetchAbsolute'

export const fetchAddress = async (id: string): Promise<AddressResponse> => {
    return await fetchAbsolute<AddressResponse>(`/addresses/${id}`)
}

export const createAddress = async (
    args: AddressCreateArgs
): Promise<AddressResponse> => {
    return await fetchAbsolute<AddressResponse>('/addresses', {
        method: 'POST',
        body: JSON.stringify(args),
    })
}

export const updateAddress = async (
    id: string,
    args: AddressUpdateArgs
): Promise<AddressResponse> => {
    return await fetchAbsolute<AddressResponse>(`/addresses/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(args),
    })
}

export const deleteAddress = async (id: string): Promise<void> => {
    return await fetchAbsolute(`/addresses/${id}`, {
        method: 'DELETE',
    })
}
