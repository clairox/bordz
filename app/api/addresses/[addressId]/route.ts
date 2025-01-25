import { NextRequest, NextResponse } from 'next/server'

import { handleRoute } from '../../shared'
import { DynamicRoutePropsWithParams } from '@/types/api'
import { deleteAddress, getAddress, updateAddress } from 'services/address'

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
        const data = await request.json()

        const updatedAddress = await updateAddress(addressId, {
            fullName: data.fullName,
            line1: data.line1,
            line2: data.line2,
            city: data.city,
            state: data.state,
            postalCode: data.postalCode,
        })
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
