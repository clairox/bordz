import { NextRequest, NextResponse } from 'next/server'

import { handleRoute } from '@/app/api/shared'
import { getBoardByProductId } from '@/lib/db'
import { createNotFoundError } from '@/lib/errors'
import { DynamicRoutePropsWithParams } from '@/types/api'

type Props = DynamicRoutePropsWithParams<{ productId: string }>

export const GET = async (req: NextRequest, { params: { productId } }: Props) =>
    await handleRoute(async () => {
        const full = req.nextUrl.searchParams.get('full')

        const board = await getBoardByProductId(productId, full === 'true')
        if (!board) {
            throw createNotFoundError('Board')
        }

        return NextResponse.json(board)
    })
