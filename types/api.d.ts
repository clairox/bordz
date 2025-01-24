import { AddressRecord } from './database'
import {
    BoardFullQueryResult,
    BoardQueryResult,
    CartLineQueryResult,
    CartQueryResult,
    CheckoutQueryResult,
    BoardComponentQueryResult,
    CustomerQueryResult,
    OrderQueryResult,
    ProductQueryResult,
    WishlistLineQueryResult,
    WishlistQueryResult,
} from './queries'
import { SortKey } from './sorting'

/* Responses */
type AddressResponse = AddressRecord
type BoardResponse = BoardQueryResult
type BoardFullResponse = BoardFullQueryResult
type CartResponse = CartQueryResult
type CartLineResponse = CartLineQueryResult
type CheckoutResponse = CheckoutQueryResult
type BoardComponentResponse = BoardComponentQueryResult
type CustomerResponse = CustomerQueryResult
type OrderResponse = OrderQueryResult
type ProductResponse = ProductQueryResult
type WishlistResponse = WishlistQueryResult
type WishlistLinesResponse = {
    data: WishlistLineQueryResult[]
    nextPage: number | undefined
}

/* Creating */
type AddressCreateArgs = {
    fullName: string
    line1: string
    line2?: string
    city: string
    state: string
    countryCode: string
    postalCode: string
    phone?: string
    ownerId?: string
    isCustomerDefault?: boolean
}
type BoardCreateArgs = {
    productId: string
    deckId: string
    trucksId: string
    wheelsId: string
    bearingsId: string
    hardwareId: string
    griptapeId: string
}
type BoardComponentCreateArgs = {
    title: string
    price: number
    images?: string[]
    model?: string
    description?: string
    specifications?: string[]
    totalInventory: number
    category: string
    vendor: string
    size: string
    color: string
}
type CustomerCreateArgs = {
    userId: string
    email: string
    firstName: string
    lastName: string
    birthDate?: Date
    phone?: string
}
type ProductCreateArgs = {
    title: string
    price: number
    type: 'BOARD' | 'OTHER'
    featuredImage?: string
    availableForSale?: boolean
    isPublic?: boolean
}

/* Updating */
type AddressUpdateArgs = Partial<{
    fullName: string
    line1: string
    line2: string | null
    city: string
    state: string
    countryCode: string
    postalCode: string
    phone: string | null
    isCustomerDefault: boolean
}>
type CheckoutUpdateArgs = Partial<{
    email: string
    shippingAddressId: string
    subtotal: number
    total: number
    totalTax: number
    totalShipping: number
    paymentIntentId: string
}>
type BoardComponentUpdateArgs = Partial<{
    title: string
    price: number
    image: string[]
    model: string
    description: string
    specifications: string[]
    totalInventory: number
    category: string
    vendor: string
    size: string
    color: string
}>
type CustomerUpdateArgs = Partial<{
    email: string
    firstName: string
    lastName: string
    phone: string
    addresses: Address[]
}>
type OrderUpdateArgs = Partial<{
    customerId: string
    email: string
    phone: string
    shippingAddressId: string
    shippingAddress: Address
    totalShipping: number
    totalTax: number
}>
type ProductUpdateArgs = Partial<{
    title: string
    price: number
    featuredImage: string
    isPublic: boolean
}>

/* Other */

type PaginatedQueryOptions = Partial<{
    page: number
    size: number
    orderBy: SortKey
}>

type DynamicRoutePropsWithParams<T extends object> = {
    params: T
}
