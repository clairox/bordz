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
    createdAt: Date
    id: string
    price: number
    productType: 'BOARD' | 'OTHER'
    title: string
    updatedAt: Date
    compareAtPrice?: number
    featuredImage?: string | null
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
    defaultAddressId?: string
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
    ownerId: string
    subtotal: number
    total: number
    totalQuantity: number
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
    email: string
    lines: OrderLine[]
    phone?: string
    shippingAddressId?: string
    subtotal: number
    total: number
    totalShipping: number
    totalTax: number
    createdAt: Date
    updatedAt: Date
}

type ComponentName =
    | 'deck'
    | 'trucks'
    | 'wheels'
    | 'bearings'
    | 'hardware'
    | 'griptape'
