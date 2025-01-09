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
    deck: Component
    trucks: Component
    wheels: Component
    bearings: Component
    hardware: Component
    griptape: Component
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

type Component = {
    id: string
    title: string
    description?: string
    images?: string[]
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

type Customer = {
    id: string
    userId: string
    email: string
    defaultAddress?: Address
    addresses: Address[]
    displayName: string
    firstName: string
    lastName: string
    numberOfOrders: number
    phone?: string
}

type FetchManyOptions = {
    size?: number
    page?: number
    orderBy?: SortKey
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
    nextPage?: number
}

type Product = {
    id: string
    title: string
    price: number
    featuredImage?: string
    availableForSale: boolean
    productType: 'BOARD' | 'OTHER'
    board?: Board
    isPublic: boolean
}

type SkateLabMode = 'edit' | 'customize' | 'default'

type SortKey = 'date-desc' | 'date-asc' | 'price-asc' | 'price-desc'

type Wishlist = {
    id: string
    lines: WishlistLine[]
    ownerId?: string
    quantity: number
}

type WishlistLine = {
    id: string
    wishlistId: string
    product: Product
}

/* Component Attributes */

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
    label: ComponentTypeAsCategory[ComponentType]
}
