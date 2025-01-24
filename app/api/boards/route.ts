import { NextRequest, NextResponse } from 'next/server'
import { handleRoute, validateRequestBody } from '../shared'
import { createBoard } from 'services/board'

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()

        const requiredFields = [
            'productId',
            'deckId',
            'trucksId',
            'wheelsId',
            'bearingsId',
            'hardwareId',
            'griptapeId',
        ]
        validateRequestBody(data, requiredFields)

        const newBoard = await createBoard({
            productId: data.productId,
            deckId: data.deckId,
            trucksId: data.trucksId,
            wheelsId: data.wheelsId,
            bearingsId: data.bearingsId,
            hardwareId: data.hardwareId,
            griptapeId: data.griptapeId,
        })

        return NextResponse.json(newBoard)
    })
