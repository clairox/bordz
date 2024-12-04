import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { ComponentTable } from '@/drizzle/schema/component'
import { ComponentRecord } from '@/types/records'

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

    components['deck'] = await db.query.ComponentTable.findFirst({
        where: eq(ComponentTable.id, ids.deckId),
    })
    components['trucks'] = await db.query.ComponentTable.findFirst({
        where: eq(ComponentTable.id, ids.trucksId),
    })
    components['wheels'] = await db.query.ComponentTable.findFirst({
        where: eq(ComponentTable.id, ids.wheelsId),
    })
    components['bearings'] = await db.query.ComponentTable.findFirst({
        where: eq(ComponentTable.id, ids.bearingsId),
    })
    components['hardware'] = await db.query.ComponentTable.findFirst({
        where: eq(ComponentTable.id, ids.hardwareId),
    })
    components['griptape'] = await db.query.ComponentTable.findFirst({
        where: eq(ComponentTable.id, ids.griptapeId),
    })

    return components
}

export default getComponents
