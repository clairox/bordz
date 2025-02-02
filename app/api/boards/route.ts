import { NextRequest, NextResponse } from 'next/server'
import { handleRoute, PostBoardSchema } from '../shared'
import { createBoard } from 'services/board'
import { chkRequest } from '@/lib/validator'

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await chkRequest(PostBoardSchema, request)
        const newBoard = await createBoard(data)
        return NextResponse.json(newBoard)
    })
