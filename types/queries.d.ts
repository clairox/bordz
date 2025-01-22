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
    product: ProductQueryResult
}

type BoardComponentQueryResult = BoardComponentRecord & {
    attrs: BoardComponentAttrsQueryResult
}

type BoardComponentSummaryQueryResult = BoardComponentRecord

type BoardComponentAttrsQueryResult = BoardComponentAttrsRecord & {
    category: CategoryRecord
    vendor: VendorRecord
    size: SizeRecord
    color: ColorRecord
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

type WishlistLineQueryResult = WishlistLineRecord & {
    product: ProductQueryResult
}
