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

type CompleteBoard = {
    availableForSale: boolean
    featuredImage: Image
    id: string
    parts: BoardSetup
}

type CartLine = {
    cost: {
        subtotalAmount: Money
        totalAmount: Money
    }
    id: string
    product: CompleteBoard
    quantity: number
}

type Customer = {
    id: string
}

type Cart = {
    buyer: Customer | null
    cost: {
        subtotalAmount: Money
        totalAmount: Money
    }
    id: string
    lines: CartLine[]
    totalQuantity: number
}
