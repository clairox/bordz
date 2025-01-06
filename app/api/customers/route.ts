import { NextRequest, NextResponse } from 'next/server'
import { desc, inArray } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { CustomerTable } from '@/drizzle/schema/user'
import {
    calculateNextPageNumber,
    getRequestOptionsParams,
    handleRoute,
    validateRequestBody,
} from '../shared'
import { AddressTable } from '@/drizzle/schema/address'

export const GET = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { page, size } = getRequestOptionsParams(request)

        const customers = await db.query.CustomerTable.findMany({
            limit: size,
            offset: (page - 1) * size,
            with: {
                defaultAddress: { with: { address: true } },
                addresses: { orderBy: [desc(AddressTable.createdAt)] },
            },
        })

        const nextPage = await calculateNextPageNumber(
            page,
            size,
            CustomerTable
        )

        return NextResponse.json({ data: customers, nextPage })
    })

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        const requiredFields = ['email', 'firstName', 'lastName', 'userId']
        validateRequestBody(data, requiredFields)

        const customer = await db
            .insert(CustomerTable)
            .values({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                userId: data.userId,
            })
            .returning()
            .then(rows => rows[0])

        return NextResponse.json(customer)
    })

export const DELETE = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        validateRequestBody(data, ['ids'])

        await db
            .delete(CustomerTable)
            .where(inArray(CustomerTable.id, data.ids))
        return new NextResponse(null, { status: 204 })
    })
