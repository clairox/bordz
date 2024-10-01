import { NextRequest, NextResponse } from 'next/server'

export const GET = (request: NextRequest) => {
    return NextResponse.json({
        buyer: null,
        cost: {
            subtotalAmount: { amount: 0, currencyCode: 'USD' },
            totalAmount: { amount: 0, currencyCode: 'USD' },
        },
        id: 'a093f839rf',
        lines: [],
        totalQuantity: 0,
    })
}

export const POST = (request: NextRequest) => {
    return NextResponse.json({
        buyer: null,
        cost: {
            subtotalAmount: { amount: 0, currencyCode: 'USD' },
            totalAmount: { amount: 0, currencyCode: 'USD' },
        },
        id: 'a093f839rf',
        lines: [],
        totalQuantity: 0,
    })
}
