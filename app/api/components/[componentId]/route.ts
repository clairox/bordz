import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { ComponentTable } from '@/drizzle/schema/component'
import { createNotFoundError } from '@/lib/errors'
import { handleRoute } from '../../shared'

type Props = DynamicRoutePropsWithParams<{ componentId: string }>

export const GET = async (_: NextRequest, { params: { componentId } }: Props) =>
    await handleRoute(async () => {
        const component = await db.query.ComponentTable.findFirst({
            where: eq(ComponentTable.id, componentId),
            with: {
                componentAttributes: {
                    with: {
                        category: true,
                        size: true,
                        color: true,
                        vendor: true,
                    },
                },
            },
        })

        if (!component) {
            throw createNotFoundError('Component')
        }

        return NextResponse.json(component)
    })
