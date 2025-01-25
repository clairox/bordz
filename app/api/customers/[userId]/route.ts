import { NextRequest, NextResponse } from 'next/server'

import { handleRoute } from '../../shared'
import { DynamicRoutePropsWithParams } from '@/types/api'
import {
    deleteCustomerByUserId,
    getCustomerByUserId,
    updateCustomerByUserId,
} from 'services/customer'

type Props = DynamicRoutePropsWithParams<{ userId: string }>

export const GET = async (_: NextRequest, { params: { userId } }: Props) =>
    await handleRoute(async () => {
        const customer = await getCustomerByUserId(userId)
        return NextResponse.json(customer)
    })

export const PATCH = async (
    request: NextRequest,
    { params: { userId } }: Props
) =>
    await handleRoute(async () => {
        const data = await request.json()

        const updatedCustomer = await updateCustomerByUserId(userId, {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
        })
        return NextResponse.json(updatedCustomer)
    })

export const DELETE = async (_: NextRequest, { params: { userId } }: Props) =>
    await handleRoute(async () => {
        await deleteCustomerByUserId(userId)
        return new NextResponse(null, { status: 204 })
    })
