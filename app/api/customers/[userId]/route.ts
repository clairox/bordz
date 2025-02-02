import { NextRequest, NextResponse } from 'next/server'

import { handleRoute, PatchCustomerSchema } from '../../shared'
import { DynamicRoutePropsWithParams } from '@/types/api'
import {
    deleteCustomerByUserId,
    getCustomerByUserId,
    updateCustomerByUserId,
} from 'services/customer'
import { chkRequest } from '@/lib/validator'

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
        const data = await chkRequest(PatchCustomerSchema, request)
        const updatedCustomer = await updateCustomerByUserId(userId, data)
        return NextResponse.json(updatedCustomer)
    })

export const DELETE = async (_: NextRequest, { params: { userId } }: Props) =>
    await handleRoute(async () => {
        await deleteCustomerByUserId(userId)
        return new NextResponse(null, { status: 204 })
    })
