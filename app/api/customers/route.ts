import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/drizzle/db'
import { CustomerTable } from '@/drizzle/schema/user'
import {
    createBadRequestError,
    createNotFoundError,
    handleError,
} from '@/lib/errors'
import { getCustomerByUserId, handleRoute } from '../shared'
import { eq } from 'drizzle-orm'

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

const validateBody = (body: any, requiredFields: any[]) => {
    return requiredFields.filter(field => body[field] == undefined)
}

export const PATCH = async (request: NextRequest) => {
    return await handleRoute(async () => {
        const body = await request.json()
        const requiredFields = ['userId', 'firstName', 'lastName']
        const missingFields = validateBody(body, requiredFields)

        if (missingFields.length > 0) {
            return handleError(
                createBadRequestError(
                    `Missing fields ${missingFields.join(', ')}`
                )
            )
        }

        const customer = await db
            .update(CustomerTable)
            .set({
                firstName: body.firstName,
                lastName: body.lastName,
                phone: body.phone,
            })
            .where(eq(CustomerTable.userId, body.userId))
            .returning()
            .then(rows => rows[0])

        return NextResponse.json(customer)
    })
}
