import { db } from '.'
import { ProductTable } from '@/drizzle/schema/product'

const seed = async () => {
    type ProductType = 'OTHER' | 'BOARD'

    const products = [
        {
            title: 'Baker Deck',
            price: 6995,
            availableForSale: true,
            productType: 'OTHER' as ProductType,
        },
        {
            title: 'Venture Trucks',
            price: 4995,
            availableForSale: true,
            productType: 'OTHER' as ProductType,
        },
        {
            title: 'Spitfire Wheels',
            price: 3495,
            availableForSale: true,
            productType: 'OTHER' as ProductType,
        },
        {
            title: 'Bones Bearings',
            price: 2995,
            availableForSale: true,
            productType: 'OTHER' as ProductType,
        },
        {
            title: 'Mob Griptape',
            price: 595,
            availableForSale: false,
            productType: 'OTHER' as ProductType,
        },
    ]

    await db.insert(ProductTable).values(products)
}

seed()
