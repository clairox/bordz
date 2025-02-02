import { NextRequest, NextResponse } from 'next/server'

import { handleRoute, PatchAddressSchema } from '../../shared'
import { DynamicRoutePropsWithParams } from '@/types/api'
import { deleteAddress, getAddress, updateAddress } from 'services/address'
import { chkRequest } from '@/lib/validator'

type Props = DynamicRoutePropsWithParams<{ addressId: string }>

export const GET = async (_: NextRequest, { params: { addressId } }: Props) =>
    await handleRoute(async () => {
        const address = await getAddress(addressId)
        return NextResponse.json(address)
    })

export const PATCH = async (
    request: NextRequest,
    { params: { addressId } }: Props
) =>
    await handleRoute(async () => {
        const data = await chkRequest(PatchAddressSchema, request)
        const updatedAddress = await updateAddress(addressId, data)
        return NextResponse.json(updatedAddress)
    })

export const DELETE = async (
    _: NextRequest,
    { params: { addressId } }: Props
) =>
    await handleRoute(async () => {
        await deleteAddress(addressId)
        return new NextResponse(null, { status: 204 })
    })
