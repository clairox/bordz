type Money = {
    amount: number
    currencyCode: string
}

type Image = {
    alt: string
    height: number
    src: string
    width: number
}

type Product = {
    availableForSale: boolean
    boardSetup?: BoardSetup
    createdAt: Date
    id: string
    price: number
    productType: 'BOARD' | 'OTHER'
    title: string
    updatedAt: Date
    compareAtPrice?: number
    featuredImage?: string | null
    isPublic: boolean
}

type Page<T> = {
    data: T[]
    nextPage?: number
}

type CartLine = {
    id: string
    cartId: string
    product: Product
    productId: string
    quantity: number
    subtotal: number
    total: number
    createdAt: Date
    updatedAt: Date
}

type Customer = {
    id: string
    userId: string
    email: string
    defaultAddress?: { address: Address }
    addresses: Address[]
    displayName: string
    firstName: string
    lastName: string
    numberOfOrders: number
    phone?: string
    createdAt: Date
    updatedAt: Date
}

type Cart = {
    id: string
    checkout?: Checkout | null
    lines: CartLine[]
    ownerId?: string
    subtotal: number
    total: number
    totalQuantity: number
    createdAt: Date
    updatedAt: Date
}

type WishlistLine = {
    id: string
    wishlistId: string
    product: Product
    productId: string
    createdAt: Date
    updatedAt: Date
}

type Wishlist = {
    id: string
    lines: WishlistLine[]
    ownerId?: string
    quantity: number
    createdAt: Date
    updatedAt: Date
}

type CheckoutLine = {
    id: string
    checkoutId: string
    product?: Product
    productId?: string
    quantity: number
    unitPrice: number
    createdAt: Date
    updatedAt: Date
}

type Checkout = {
    id: string
    cartId?: string
    completedAt?: Date
    customerId?: string
    email?: string
    lines: CheckoutLine[]
    orderId?: string
    paymentIntentId?: string
    shippingAddressId?: string
    subtotal: number
    total: number
    totalShipping: number
    totalTax: number
    createdAt: Date
    updatedAt: Date
}

type OrderLine = {
    id: string
    orderId: string
    product?: Product
    productId?: string
    quantity: number
    title: string
    total: number
    createdAt: Date
    updatedAt: Date
}

type Order = {
    id: string
    customerId?: string
    customer: Customer
    email: string
    lines: OrderLine[]
    phone?: string
    shippingAddressId?: string
    shippingAddress: Address
    subtotal: number
    total: number
    totalShipping: number
    totalTax: number
    createdAt: Date
    updatedAt: Date
}

type Address = {
    id: string
    fullName: string
    line1: string
    line2?: string | null
    city: string
    state: string
    countryCode: string
    postalCode: string
    phone?: string | null
    formatted: string
    ownerId?: string | null
}

type ComponentName =
    | 'deck'
    | 'trucks'
    | 'wheels'
    | 'bearings'
    | 'hardware'
    | 'griptape'

type SkateLabMode = 'edit' | 'customize' | 'default'

type FormMessageType = 'error' | 'success'

type SortKey = 'date-desc' | 'date-asc' | 'price-asc' | 'price-desc'

type FetchManyOptions = {
    size?: number
    page?: number
    orderBy?: SortKey
}

type DynamicRoutePropsWithParams<T extends object> = {
    params: T
}

type AssetData = {
    error: string | null
    path: string | null
    signedUrl: string
    isSelected: boolean
}
