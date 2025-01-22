import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { BoardComponents } from '@/drizzle/schema/boardComponent'
import { BoardComponentRecord } from '@/types/database'

const getBoardComponents = async (
    ids: Record<
        | 'deckId'
        | 'trucksId'
        | 'wheelsId'
        | 'bearingsId'
        | 'hardwareId'
        | 'griptapeId',
        string
    >
) => {
    const boardComponents: Record<
        string,
        BoardComponentRecord | null | undefined
    > = {
        deck: null,
        trucks: null,
        wheels: null,
        bearings: null,
        hardware: null,
        griptape: null,
    }

    boardComponents['deck'] = await db.query.BoardComponents.findFirst({
        where: eq(BoardComponents.id, ids.deckId),
    })
    boardComponents['trucks'] = await db.query.BoardComponents.findFirst({
        where: eq(BoardComponents.id, ids.trucksId),
    })
    boardComponents['wheels'] = await db.query.BoardComponents.findFirst({
        where: eq(BoardComponents.id, ids.wheelsId),
    })
    boardComponents['bearings'] = await db.query.BoardComponents.findFirst({
        where: eq(BoardComponents.id, ids.bearingsId),
    })
    boardComponents['hardware'] = await db.query.BoardComponents.findFirst({
        where: eq(BoardComponents.id, ids.hardwareId),
    })
    boardComponents['griptape'] = await db.query.BoardComponents.findFirst({
        where: eq(BoardComponents.id, ids.griptapeId),
    })

    return boardComponents
}

export default getBoardComponents
