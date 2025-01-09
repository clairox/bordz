import {
    CartLineQueryResult,
    CartQueryResult,
    CheckoutQueryResult,
    ComponentQueryResult,
    CustomerQueryResult,
    OrderQueryResult,
    ProductQueryResult,
    WishlistLineQueryResult,
} from './queries'

/* Responses */
type CartResponse = CartQueryResult
type CartLineResponse = CartLineQueryResult
type CheckoutResponse = CheckoutQueryResult
type ComponentResponse = ComponentQueryResult
type CustomerResponse = CustomerQueryResult
type OrderResponse = OrderQueryResult
type ProductResponse = ProductQueryResult
type WishlistResponse = WishlistRecord & { lines: WishlistLineQueryResult[] }
type WishlistLinesResponse = {
    data: WishlistLineQueryResult[]
    nextPage: number | undefined
}

/* Updating */
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

type DynamicRoutePropsWithParams<T extends object> = {
    params: T
}
