type Address = {
    id: string
    ownerId?: string
    fullName: string
    line1: string
    line2?: string
    city: string
    state: string
    countryCode: string
    postalCode: string
    phone?: string
    formatted: string
}

type AssetData = {
    error: string | null
    path: string | null
    signedUrl: string
    isSelected: boolean
}

type Board = {
    id: string
    productId: string
    deck: BoardComponentSummary
    trucks: BoardComponentSummary
    wheels: BoardComponentSummary
    bearings: BoardComponentSummary
    hardware: BoardComponentSummary
    griptape: BoardComponentSummary
}

type BoardFull = {
    id: string
    productId: string
    deck: BoardComponent
    trucks: BoardComponent
    wheels: BoardComponent
    bearings: BoardComponent
    hardware: BoardComponent
    griptape: BoardComponent
}

type Cart = {
    id: string
    ownerId?: string
    lines: CartLine[]
    totalQuantity: number
    subtotal: number
    total: number
    checkoutId?: string
}

type CartLine = {
    id: string
    cartId: string
    product: Product
    quantity: number
    subtotal: number
    total: number
}

type Checkout = {
    id: string
    customerId?: string
    email?: string
    lines: CheckoutLine[]
    subtotal: number
    totalShipping: number
    totalTax: number
    total: number
    completedAt?: Date
    shippingAddressId?: string
    paymentIntentId?: string
    cartId?: string
    orderId?: string
}

type CheckoutLine = {
    id: string
    checkoutId: string
    product?: Product
    quantity: number
    unitPrice: number
}

type BoardComponent = {
    id: string
    title: string
    description?: string
    featuredImage?: string
    images: string[]
    model?: string
    price: number
    compareAtPrice?: number
    specifications?: string[]
    availableForSale: boolean
    totalInventory: number
    category: Category
    size: Size
    color: Color
    vendor: Vendor
}

type BoardComponentSummary = {
    id: string
    title: string
    featuredImage?: string
    price: number
    compareAtPrice?: number
    availableForSale: boolean
    totalInventory: number
}

type Customer = {
    id: string
    userId: string
    email: string
    displayName: string
    firstName: string
    lastName: string
    defaultAddress?: Address
    addresses: Address[]
    numberOfOrders: number
    phone?: string
}

type FormMessageType = 'error' | 'success'

type FormSelectOption = {
    value: string
    name: string
}

type Order = {
    id: string
    customerId?: string
    lines: OrderLine[]
    email: string
    phone?: string
    shippingAddress: Address
    subtotal: number
    totalShipping: number
    totalTax: number
    total: number
    createdAt: Date
}

type OrderAdminList = {
    id: string
    customerEmail: string
    customerName: string
    total: number
    shippingAddress: string
    createdAt: Date
}

type OrderLine = {
    id: string
    orderId: string
    title: string
    product?: Product
    quantity: number
    total: number
}

type Page<T> = {
    data: T[]
    totalCount: number
    totalPages: number
    nextPage?: number | null
}

type Product = {
    id: string
    title: string
    price: number
    featuredImage?: string
    availableForSale: boolean
    productType: 'BOARD' | 'OTHER'
    isPublic: boolean
}

type AuthInfo = { id: string; email: string }

type InitialAppState = {
    customer: Customer | null
    cart: Cart
    wishlist: Wishlist
}

type SkateLabMode = 'edit' | 'customize' | 'default'

type Wishlist = {
    id: string
    ownerId?: string
    lines: WishlistLine[]
    quantity: number
}

type WishlistLine = {
    id: string
    wishlistId: string
    product: Product
}

/* BoardComponent Attributes */

type Color = {
    id: string
    label: string
    value: string
}

type Size = {
    id: string
    label: string
}

type Vendor = {
    id: string
    name: string
}

type Category = {
    id: string
    label: string
}
