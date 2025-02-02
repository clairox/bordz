import { NextRequest, NextResponse } from 'next/server'

import { handleRoute, PostAddressSchema } from '../shared'
import {
    getAddresses,
    getAddressesByOwnerId,
    createAddress,
} from 'services/address'
import { AddressQueryResult } from '@/types/queries'
import { chkRequest } from '@/lib/validator'

export const GET = async (request: NextRequest) =>
    await handleRoute(async () => {
        const ownerId = request.nextUrl.searchParams.get('ownerId')

        let addresses = {} as AddressQueryResult[]
        if (ownerId) {
            addresses = await getAddressesByOwnerId(ownerId)
        } else {
            addresses = await getAddresses()
        }
        return NextResponse.json(addresses)
    })

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await chkRequest(PostAddressSchema, request)
        const address = await createAddress(data)
        return NextResponse.json(address)
    })
