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
import { getCustomerByUserId } from '../shared'

export const GET = async (request: NextRequest) => {
    const userId = request.nextUrl.searchParams.get('userId')
    if (!userId) {
        return handleError(createBadRequestError())
    }

    try {
        const customer = await getCustomerByUserId(userId)

        if (!customer) {
            throw createNotFoundError('Customer')
        }

        return NextResponse.json(customer)
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
