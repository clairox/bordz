import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { CustomerTable } from '@/drizzle/schema/user'
import {
    createBadRequestError,
    createInternalServerError,
    createNotFoundError,
    handleError,
} from '@/lib/errors'
import { AddressTable } from '@/drizzle/schema/address'

export const GET = async (request: NextRequest) => {
    const userId = request.nextUrl.searchParams.get('userId')
    if (!userId) {
        return handleError(createBadRequestError())
    }

    try {
        const customer = await db.query.CustomerTable.findFirst({
            where: eq(CustomerTable.userId, userId),
        })

        if (!customer) {
            throw createNotFoundError('Customer')
        }

        // TODO: Change customer schema so that this isn't necessary
        if (!customer.defaultAddressId) {
            return NextResponse.json(customer)
        }

        const defaultAddress = await db.query.AddressTable.findFirst({
            where: eq(AddressTable.id, customer.defaultAddressId),
        })

        if (!defaultAddress) {
            throw createInternalServerError()
        }

        return NextResponse.json({ ...customer, defaultAddress })
    } catch (error) {
        return handleError(error as Error)
    }
}

export const POST = async (request: NextRequest) => {
    const { firstName, lastName, phone, userId } = await request.json()

    if (!firstName || !lastName || !userId) {
        return handleError(createBadRequestError())
    }

    try {
        const customer = await db
            .insert(CustomerTable)
            .values({
                firstName,
                lastName,
                displayName: firstName + ' ' + lastName,
                phone,
                userId,
            })
            .returning()
            .then(rows => rows[0])

        return NextResponse.json(customer)
    } catch (error) {
        return handleError(error as Error)
    }
}
