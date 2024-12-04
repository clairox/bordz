import { db } from '@/drizzle/db'
import { BoardSetupTable } from '@/drizzle/schema/boardSetup'
import { eq } from 'drizzle-orm'

const getBoardSetup = async (id: string) => {
    return await db.query.BoardSetupTable.findFirst({
        where: eq(BoardSetupTable.id, id),
        with: {
            deck: true,
            trucks: true,
            wheels: true,
            bearings: true,
            hardware: true,
            griptape: true,
        },
    })
}

export default getBoardSetup
