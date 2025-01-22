import { db } from '@/drizzle/db'
import { Boards } from '@/drizzle/schema/board'
import { eq } from 'drizzle-orm'

const getBoard = async (id: string) => {
    return await db.query.Boards.findFirst({
        where: eq(Boards.id, id),
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

export default getBoard
