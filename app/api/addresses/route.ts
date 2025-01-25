import { NextRequest, NextResponse } from 'next/server'

import { handleRoute, validateRequestBody } from '../shared'
import {
    getAddresses,
    getAddressesByOwnerId,
    createAddress,
} from 'services/address'
import { AddressQueryResult } from '@/types/queries'

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
        const data = await request.json()
        const requiredFields = [
            'fullName',
            'line1',
            'city',
            'state',
            'countryCode',
            'postalCode',
        ]
        validateRequestBody(data, requiredFields)

        const { ownerId } = data

        const address = await createAddress({
            fullName: data.fullName,
            line1: data.line1,
            line2: data.line2 || null,
            city: data.city,
            state: data.state,
            postalCode: data.postalCode,
            countryCode: 'US',
            ownerId: ownerId,
        })

        return NextResponse.json(address)
    })
