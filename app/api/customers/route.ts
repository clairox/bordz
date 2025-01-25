import { NextRequest, NextResponse } from 'next/server'

import {
    getRequestOptionsParams,
    handleRoute,
    validateRequestBody,
} from '../shared'
import { createCustomer, deleteCustomer, getCustomers } from 'services/customer'

export const GET = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { page, size } = getRequestOptionsParams(request)

        const data = await getCustomers({ page, size })
        return NextResponse.json(data)
    })

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        const requiredFields = ['email', 'firstName', 'lastName', 'userId']
        validateRequestBody(data, requiredFields)

        const newCustomer = await createCustomer({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            userId: data.userId,
        })
        return NextResponse.json(newCustomer)
    })

export const DELETE = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        validateRequestBody(data, ['ids'])
        await deleteCustomer(data.ids)
        return new NextResponse(null, { status: 204 })
    })
