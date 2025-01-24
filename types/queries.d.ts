import {
    AddressRecord,
    BoardRecord,
    CartLineRecord,
    CartRecord,
    CategoryRecord,
    CheckoutLineRecord,
    CheckoutRecord,
    ColorRecord,
    BoardComponentAttrsRecord,
    BoardComponentRecord,
    CustomerRecord,
    OrderLineRecord,
    OrderRecord,
    ProductRecord,
    SizeRecord,
    VendorRecord,
    WishlistLineRecord,
    WishlistRecord,
} from './database'

type BoardQueryResult = BoardRecord & {
    deck: BoardComponentSummaryQueryResult
    trucks: BoardComponentSummaryQueryResult
    wheels: BoardComponentSummaryQueryResult
    bearings: BoardComponentSummaryQueryResult
    hardware: BoardComponentSummaryQueryResult
    griptape: BoardComponentSummaryQueryResult
}

type BoardFullQueryResult = BoardRecord & {
    deck: BoardComponentQueryResult
    trucks: BoardComponentQueryResult
    wheels: BoardComponentQueryResult
    bearings: BoardComponentQueryResult
    hardware: BoardComponentQueryResult
    griptape: BoardComponentQueryResult
}

type CartQueryResult = CartRecord & {
    lines: CartLineQueryResult[]
    checkout: CheckoutRecord | null
}

type CartLineQueryResult = CartLineRecord & { product: ProductQueryResult }

type CheckoutQueryResult = CheckoutRecord & {
    lines: CheckoutLineQueryResult[]
}

type CheckoutLineQueryResult = CheckoutLineRecord & {
    product: ProductQueryResult | null
}

type BoardComponentQueryResult = BoardComponentRecord & {
    attrs: BoardComponentAttrsQueryResult | null
}

type BoardComponentSummaryQueryResult = BoardComponentRecord

type BoardComponentAttrsQueryResult = BoardComponentAttrsRecord & {
    category: CategoryRecord | null
    vendor: VendorRecord | null
    size: SizeRecord | null
    color: ColorRecord | null
}

type CustomerQueryResult = CustomerRecord & {
    defaultAddress: AddressRecord | null
    addresses: AddressRecord[]
}

type OrderQueryResult = OrderRecord & {
    lines: OrderLineQueryResult[]
    customer: CustomerRecord
    shippingAddress: AddressRecord
}

type OrderLineQueryResult = OrderLineRecord & {
    product: ProductQueryResult
}

type ProductQueryResult = ProductRecord

type WishlistQueryResult = WishlistRecord & {
    items: WishlistLineQueryResult[]
}

type WishlistLineQueryResult = WishlistLineRecord & {
    product: ProductQueryResult
}
