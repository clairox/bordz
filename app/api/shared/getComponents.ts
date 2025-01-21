import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { BoardComponents } from '@/drizzle/schema/component'
import { ComponentRecord } from '@/types/database'

const getComponents = async (
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
    const components: Record<string, ComponentRecord | null | undefined> = {
        deck: null,
        trucks: null,
        wheels: null,
        bearings: null,
        hardware: null,
        griptape: null,
    }

    components['deck'] = await db.query.BoardComponents.findFirst({
        where: eq(BoardComponents.id, ids.deckId),
    })
    components['trucks'] = await db.query.BoardComponents.findFirst({
        where: eq(BoardComponents.id, ids.trucksId),
    })
    components['wheels'] = await db.query.BoardComponents.findFirst({
        where: eq(BoardComponents.id, ids.wheelsId),
    })
    components['bearings'] = await db.query.BoardComponents.findFirst({
        where: eq(BoardComponents.id, ids.bearingsId),
    })
    components['hardware'] = await db.query.BoardComponents.findFirst({
        where: eq(BoardComponents.id, ids.hardwareId),
    })
    components['griptape'] = await db.query.BoardComponents.findFirst({
        where: eq(BoardComponents.id, ids.griptapeId),
    })

    return components
}

export default getComponents
