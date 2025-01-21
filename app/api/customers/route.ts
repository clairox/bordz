import { NextRequest, NextResponse } from 'next/server'
import { desc, inArray } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { Customers } from '@/drizzle/schema/customer'
import {
    calculateNextPageNumber,
    getRequestOptionsParams,
    handleRoute,
    validateRequestBody,
} from '../shared'
import { Addresses } from '@/drizzle/schema/address'
import { CustomerQueryResult } from '@/types/queries'

export const GET = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { page, size } = getRequestOptionsParams(request)

        const customers: CustomerQueryResult[] =
            (await db.query.Customers.findMany({
                limit: size,
                offset: (page - 1) * size,
                with: {
                    defaultAddress: { with: { address: true } },
                    addresses: { orderBy: [desc(Addresses.createdAt)] },
                },
            }).then(rows => {
                if (rows.length > 0) {
                    return rows.map(row => {
                        return {
                            ...row,
                            defaultAddress: row.defaultAddress?.address || null,
                        }
                    })
                }
            })) ?? []

        const nextPage = await calculateNextPageNumber(page, size, Customers)

        return NextResponse.json({ data: customers, nextPage })
    })

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        const requiredFields = ['email', 'firstName', 'lastName', 'userId']
        validateRequestBody(data, requiredFields)

        const customer = await db
            .insert(Customers)
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

        await db.delete(Customers).where(inArray(Customers.id, data.ids))
        return new NextResponse(null, { status: 204 })
    })
