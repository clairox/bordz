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
    featuredImage?: Image
}

type CartLine = {
    id: string
    cartId: string
    product: Product
    productId: string
    quantity: number
    subtotal: number
    total: number
}

type Customer = {
    id: string
    cartId: string
}

type Cart = {
    ownerId: string
    id: string
    lines?: CartLine[]
    subtotal: number
    total: number
    totalQuantity: number
}
