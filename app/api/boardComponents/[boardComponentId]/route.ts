import { NextRequest, NextResponse } from 'next/server'

import { handleRoute, PatchBoardComponentSchema } from '../../shared'
import { DynamicRoutePropsWithParams } from '@/types/api'
import { getBoardComponent, updateBoardComponent } from 'services/board'
import { chkRequest } from '@/lib/validator'

type Props = DynamicRoutePropsWithParams<{ boardComponentId: string }>

export const GET = async (
    _: NextRequest,
    { params: { boardComponentId } }: Props
) =>
    await handleRoute(async () => {
        const boardComponent = await getBoardComponent(boardComponentId)
        return NextResponse.json(boardComponent)
    })

export const PATCH = async (
    request: NextRequest,
    { params: { boardComponentId } }: Props
) =>
    await handleRoute(async () => {
        const data = await chkRequest(PatchBoardComponentSchema, request)
        const updatedBoardComponent = await updateBoardComponent(
            boardComponentId,
            data
        )
        return NextResponse.json(updatedBoardComponent)
    })
