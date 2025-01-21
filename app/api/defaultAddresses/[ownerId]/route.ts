import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { DynamicRoutePropsWithParams } from '@/types/api'
import { handleRoute } from '../../shared'
import { db } from '@/drizzle/db'
import { DefaultAddresses } from '@/drizzle/schema/address'

type Props = DynamicRoutePropsWithParams<{ ownerId: string }>

export const GET = async (_: NextRequest, { params: { ownerId } }: Props) =>
    await handleRoute(async () => {
        const data = await db.query.DefaultAddresses.findFirst({
            where: eq(DefaultAddresses.ownerId, ownerId),
            with: { address: true },
        })

        if (data?.address) {
            return NextResponse.json(data.address)
        } else {
            return new NextResponse(null, { status: 204 })
        }
    })
