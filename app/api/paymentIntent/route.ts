import { NextRequest, NextResponse } from 'next/server'

import { handleRoute, PostPaymentIntentSchema } from '../shared'
import { createPaymentIntent } from 'services/paymentIntent'
import { chkRequest } from '@/lib/validator'

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await chkRequest(PostPaymentIntentSchema, request)
        const paymentIntent = await createPaymentIntent(data)
        return NextResponse.json(paymentIntent)
    })

// type Item = {
//     amount: number
//     quantity: number
//     id: string
// }
//
// type Address = {
//     address1: string
//     city: string
//     provinceCode: string
//     zip: string
//     countryCode: string
//     address2?: string
// }
//
// const calculateTax = async (
//     items: Item[],
//     shippingAddress: Address,
//     currency: string
// ) => {
//     //const { address1, city, provinceCode, zip, countryCode } = shippingAddress
//
//     return await stripe.tax.calculations.create({
//         currency,
//         customer_details: {
//             address: {
//                 line1: '123 Maryrose Dr',
//                 city: 'Nicholasville',
//                 state: 'KY',
//                 postal_code: '40356',
//                 country: 'US',
//             },
//             address_source: 'shipping',
//         },
//         line_items: items.map(item => buildLineItem(item)),
//     })
// }
//
// const buildLineItem = (item: Item) => ({
//     amount: item.amount,
//     quantity: item.quantity,
//     reference: item.id,
//     tax_code: 'txcd_99999999',
// })
//
// const calculateOrderAmount = (
//     items: Item[],
//     taxCalculation: Stripe.Tax.Calculation
// ) => {
//     return items.reduce((acc: number, item: Item) => {
//         return acc + item.amount
//     }, taxCalculation.tax_amount_exclusive)
// }
