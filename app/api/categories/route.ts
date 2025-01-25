import { NextResponse } from 'next/server'

import { handleRoute } from '../shared'
import { getCategories } from 'services/category'

export const GET = async () =>
    await handleRoute(async () => {
        const categories = await getCategories()
        return NextResponse.json(categories)
    })
