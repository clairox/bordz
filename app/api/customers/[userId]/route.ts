import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { Customers } from '@/drizzle/schema/customer'
import { createNotFoundError } from '@/lib/errors'
import { getCustomerByUserId, handleRoute } from '../../shared'
import { DynamicRoutePropsWithParams } from '@/types/api'

type Props = DynamicRoutePropsWithParams<{ userId: string }>

export const GET = async (_: NextRequest, { params: { userId } }: Props) =>
    await handleRoute(async () => {
        const customer = await getCustomerByUserId(userId)
        if (!customer) {
            throw createNotFoundError('Customer')
        }
        return NextResponse.json(customer)
    })

export const PATCH = async (
    request: NextRequest,
    { params: { userId } }: Props
) =>
    await handleRoute(async () => {
        const data = await request.json()

        const customer = await db
            .update(Customers)
            .set({
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
            })
            .where(eq(Customers.userId, userId))
            .returning()
            .then(async rows => await getCustomerByUserId(rows[0].userId))

        return NextResponse.json(customer)
    })

export const DELETE = async (_: NextRequest, { params: { userId } }: Props) =>
    await handleRoute(async () => {
        await db.delete(Customers).where(eq(Customers.userId, userId))
        return new NextResponse(null, { status: 204 })
    })
