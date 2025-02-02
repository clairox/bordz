import { NextRequest, NextResponse } from 'next/server'

import {
    DeleteCustomersSchema,
    getRequestOptionsParams,
    handleRoute,
    PostCustomerSchema,
} from '../shared'
import {
    createCustomer,
    deleteCustomers,
    getCustomers,
} from 'services/customer'
import { chkRequest } from '@/lib/validator'

export const GET = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { page, size } = getRequestOptionsParams(request)
        const customerData = await getCustomers({ page, size })
        return NextResponse.json(customerData)
    })

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await chkRequest(PostCustomerSchema, request)
        const newCustomer = await createCustomer(data)
        return NextResponse.json(newCustomer)
    })

export const DELETE = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { ids } = await chkRequest(DeleteCustomersSchema, request)
        await deleteCustomers(ids)
        return new NextResponse(null, { status: 204 })
    })
