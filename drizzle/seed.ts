import { createUrlHandle } from '@/utils/url'
import { db } from './db'
import {
    Categories,
    Colors,
    BoardComponentAttrs,
    BoardComponents,
    Sizes,
    Vendors,
} from './schema/boardComponent'

const seed = async () => {
    const boardComponents = [
        {
            title: 'Baker Deck',
            price: 6995,
            availableForSale: true,
            totalInventory: 10,
        },
        {
            title: 'Girl Deck',
            price: 5995,
            availableForSale: true,
            totalInventory: 10,
        },
        {
            title: 'DGK Deck',
            price: 7995,
            availableForSale: true,
            totalInventory: 10,
        },
        {
            title: 'Independent Trucks',
            price: 4995,
            availableForSale: true,
            totalInventory: 10,
        },
        {
            title: 'Venture Trucks',
            price: 4995,
            availableForSale: true,
            totalInventory: 10,
        },
        {
            title: 'Thunder Trucks',
            price: 4995,
            availableForSale: true,
            totalInventory: 10,
        },
        {
            title: 'Spitfire Wheels',
            price: 3495,
            availableForSale: true,
            totalInventory: 10,
        },
        {
            title: 'Ricta Wheels',
            price: 3195,
            availableForSale: true,
            totalInventory: 10,
        },
        {
            title: 'Bones Bearings',
            price: 1895,
            availableForSale: true,
            totalInventory: 10,
        },
        {
            title: 'Bronson Bearings',
            price: 2195,
            availableForSale: true,
            totalInventory: 10,
        },
        {
            title: 'Independent Hardware',
            price: 295,
            availableForSale: true,
            totalInventory: 10,
        },
        {
            title: 'Diamond Supply Co Hardware',
            price: 595,
            availableForSale: true,
            totalInventory: 10,
        },
        {
            title: 'Mob Griptape',
            price: 595,
            availableForSale: false,
            totalInventory: 0,
        },
        {
            title: 'Grizzly Griptape',
            price: 595,
            availableForSale: true,
            totalInventory: 10,
        },
    ]

    console.log('Clearing categories...')
    await db.delete(Categories)
    const categories = await db
        .insert(Categories)
        .values([
            { label: 'Decks' },
            { label: 'Trucks' },
            { label: 'Wheels' },
            { label: 'Bearings' },
            { label: 'Hardware' },
            { label: 'Griptape' },
        ])
        .returning()

    console.log('Clearing vendors...')
    await db.delete(Vendors)
    const vendors = await db
        .insert(Vendors)
        .values([
            { name: 'Baker' },
            { name: 'Girl' },
            { name: 'DGK' },
            { name: 'Independent' },
            { name: 'Venture' },
            { name: 'Thunder' },
            { name: 'Spitfire' },
            { name: 'Ricta' },
            { name: 'Bones' },
            { name: 'Bronson' },
            { name: 'Diamond Supply Co' },
            { name: 'Mob' },
            { name: 'Grizzly' },
        ])
        .returning()

    console.log('Clearing sizes...')
    await db.delete(Sizes)
    const sizes = await db
        .insert(Sizes)
        .values([
            { label: 'One Size' },
            { label: '8.0' },
            { label: '144' },
            { label: '53mm' },
            { label: '54mm' },
            { label: '1.5' },
        ])
        .returning()

    console.log('Clearing colors...')
    await db.delete(Colors)
    const colors = await db
        .insert(Colors)
        .values([
            { label: 'red', value: '#ff0000' },
            { label: 'orange', value: '#ffa500' },
            { label: 'yellow', value: '#ffff00' },
            { label: 'green', value: '#00ff00' },
            { label: 'blue', value: '#0000ff' },
            { label: 'indigo', value: '#4b0082' },
            { label: 'purple', value: '#800080' },
        ])
        .returning()

    console.log('Clearing boardComponents...')
    await db.delete(BoardComponents)
    console.log('Done!')

    for (let i = 0; i < boardComponents.length; i++) {
        const boardComponent = boardComponents[i]
        console.log(`Creating '${boardComponent.title}'...`)

        const newBoardComponent = await db
            .insert(BoardComponents)
            .values({
                ...boardComponent,
                handle: createUrlHandle(boardComponent.title),
            })
            .returning()
            .then(rows => rows[0])

        const createBoardComponentAttrs = async (
            boardComponent: typeof newBoardComponent
        ) => {
            const attributes = {
                boardComponentId: '',
                categoryId: '',
                vendorId: '',
                sizeId: '',
                colorId: '',
            }

            switch (boardComponent.title) {
                case 'Baker Deck':
                    attributes.vendorId = vendors.find(
                        vendor => vendor.name === 'Baker'
                    )!.id

                    attributes.colorId = colors.find(
                        color => color.label === 'red'
                    )!.id
                    break

                case 'Girl Deck':
                    attributes.vendorId = vendors.find(
                        vendor => vendor.name === 'Girl'
                    )!.id

                    attributes.colorId = colors.find(
                        color => color.label === 'green'
                    )!.id

                    break

                case 'DGK Deck':
                    attributes.vendorId = vendors.find(
                        vendor => vendor.name === 'DGK'
                    )!.id

                    attributes.colorId = colors.find(
                        color => color.label === 'blue'
                    )!.id

                    break

                case 'Independent Trucks':
                    attributes.vendorId = vendors.find(
                        vendor => vendor.name === 'Independent'
                    )!.id

                    attributes.colorId = colors.find(
                        color => color.label === 'red'
                    )!.id

                    break

                case 'Venture Trucks':
                    attributes.vendorId = vendors.find(
                        vendor => vendor.name === 'Venture'
                    )!.id

                    attributes.colorId = colors.find(
                        color => color.label === 'green'
                    )!.id

                    break

                case 'Thunder Trucks':
                    attributes.vendorId = vendors.find(
                        vendor => vendor.name === 'Thunder'
                    )!.id

                    attributes.colorId = colors.find(
                        color => color.label === 'blue'
                    )!.id

                    break

                case 'Spitfire Wheels':
                    attributes.vendorId = vendors.find(
                        vendor => vendor.name === 'Spitfire'
                    )!.id

                    attributes.colorId = colors.find(
                        color => color.label === 'red'
                    )!.id

                    attributes.sizeId = sizes.find(
                        size => size.label === '53mm'
                    )!.id

                    break

                case 'Ricta Wheels':
                    attributes.vendorId = vendors.find(
                        vendor => vendor.name === 'Ricta'
                    )!.id

                    attributes.colorId = colors.find(
                        color => color.label === 'blue'
                    )!.id

                    attributes.sizeId = sizes.find(
                        size => size.label === '54mm'
                    )!.id

                    break
                case 'Bones Bearings':
                    attributes.vendorId = vendors.find(
                        vendor => vendor.name === 'Bones'
                    )!.id

                    attributes.colorId = colors.find(
                        color => color.label === 'yellow'
                    )!.id

                    break
                case 'Bronson Bearings':
                    attributes.vendorId = vendors.find(
                        vendor => vendor.name === 'Bronson'
                    )!.id

                    attributes.colorId = colors.find(
                        color => color.label === 'indigo'
                    )!.id

                    break
                case 'Independent Hardware':
                    attributes.vendorId = vendors.find(
                        vendor => vendor.name === 'Independent'
                    )!.id

                    attributes.colorId = colors.find(
                        color => color.label === 'purple'
                    )!.id

                    break
                case 'Diamond Supply Co Hardware':
                    attributes.vendorId = vendors.find(
                        vendor => vendor.name === 'Diamond Supply Co'
                    )!.id

                    attributes.colorId = colors.find(
                        color => color.label === 'orange'
                    )!.id

                    break
                case 'Mob Griptape':
                    attributes.vendorId = vendors.find(
                        vendor => vendor.name === 'Mob'
                    )!.id

                    attributes.colorId = colors.find(
                        color => color.label === 'yellow'
                    )!.id

                    break
                case 'Grizzly Griptape':
                    attributes.vendorId = vendors.find(
                        vendor => vendor.name === 'Grizzly'
                    )!.id

                    attributes.colorId = colors.find(
                        color => color.label === 'orange'
                    )!.id

                    break
            }

            if (boardComponent.title.endsWith('Deck')) {
                attributes.categoryId = categories.find(
                    category => category.label === 'Decks'
                )!.id

                attributes.sizeId = sizes.find(size => size.label === '8.0')!.id
            } else if (boardComponent.title.endsWith('Trucks')) {
                attributes.categoryId = categories.find(
                    category => category.label === 'Trucks'
                )!.id

                attributes.sizeId = sizes.find(size => size.label === '144')!.id
            } else if (boardComponent.title.endsWith('Wheels')) {
                attributes.categoryId = categories.find(
                    category => category.label === 'Wheels'
                )!.id
            } else if (boardComponent.title.endsWith('Hardware')) {
                attributes.categoryId = categories.find(
                    category => category.label === 'Hardware'
                )!.id

                attributes.sizeId = sizes.find(size => size.label === '1.5')!.id
            } else if (boardComponent.title.endsWith('Bearings')) {
                attributes.categoryId = categories.find(
                    category => category.label === 'Bearings'
                )!.id

                attributes.sizeId = sizes.find(
                    size => size.label === 'One Size'
                )!.id
            } else if (boardComponent.title.endsWith('Griptape')) {
                attributes.categoryId = categories.find(
                    category => category.label === 'Griptape'
                )!.id

                attributes.sizeId = sizes.find(
                    size => size.label === 'One Size'
                )!.id
            }

            attributes.boardComponentId = boardComponent.id

            await db.insert(BoardComponentAttrs).values(attributes)
        }

        await createBoardComponentAttrs(newBoardComponent)
        console.log('Done!')
    }

    console.log('Seed complete')
}

seed()
