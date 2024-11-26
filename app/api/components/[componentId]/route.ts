import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { ComponentTable } from '@/drizzle/schema/component'
import { createNotFoundError, handleError } from '@/lib/errors'

export const GET = async (
    request: NextRequest,
    context: { params: { componentId: string } }
) => {
    const { componentId } = context.params

    try {
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
    } catch (error) {
        return handleError(error as Error)
    }
}
