import * as db from 'db'
import { AddressQueryResult } from '@/types/queries'
import { CreateAddressValues, UpdateAddressValues } from '@/types/services'
import { AddressRecord } from '@/types/database'
import { createNotFoundError } from '../errors'

export async function getAddress(
    id: AddressRecord['id']
): Promise<AddressQueryResult> {
    const address = await db.getAddress(id)
    if (!address) {
        throw createNotFoundError('Address')
    }
    return address!
}

export async function createAddress(
    values: CreateAddressValues
): Promise<AddressQueryResult> {
    const newAddress = await db.createAddress(values)

    const { ownerId } = values
    if (ownerId && values.isCustomerDefault) {
        await db.updateCustomerDefaultAddress(ownerId, newAddress.id, true)
    } else if (ownerId) {
        await db.updateCustomerDefaultAddress(ownerId, newAddress.id, false)
    }

    return newAddress
}

export async function updateAddress(
    id: AddressRecord['id'],
    values: UpdateAddressValues
): Promise<AddressQueryResult> {
    const updatedAddress = await db.updateAddress(id, values)
    if (!updatedAddress) {
        throw createNotFoundError('Address')
    }

    const { ownerId, isCustomerDefault } = values
    if (ownerId && isCustomerDefault === true) {
        await db.updateCustomerDefaultAddress(ownerId, updatedAddress.id, true)
    } else if (ownerId && isCustomerDefault === false) {
        await db.deleteCustomerDefaultAddress(ownerId, updatedAddress.id)
    }

    return updatedAddress
}

export async function deleteAddress(
    id: AddressRecord['id']
): Promise<AddressRecord['id']> {
    const deletedAddress = await db.deleteAddress(id)
    if (!deletedAddress) {
        throw createNotFoundError('Address')
    }

    if (deletedAddress.ownerId) {
        db.ensureCustomerDefaultAddressOnDelete(deletedAddress.ownerId)
    }
    return deletedAddress.id
}

export async function getAddresses(): Promise<AddressQueryResult[]> {
    return await db.getAddresses()
}

export async function getAddressesByOwnerId(
    ownerId: string
): Promise<AddressQueryResult[]> {
    return await db.getAddressesByOwnerId(ownerId)
}
