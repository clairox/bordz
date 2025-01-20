import {
    AddressRecord,
    BoardSetupRecord,
    CartLineRecord,
    CartRecord,
    CategoryRecord,
    CheckoutLineRecord,
    CheckoutRecord,
    ColorRecord,
    ComponentAttributesRecord,
    ComponentRecord,
    CustomerRecord,
    OrderLineRecord,
    OrderRecord,
    ProductRecord,
    SizeRecord,
    VendorRecord,
    WishlistLineRecord,
} from './database'

type BoardSetupQueryResult = BoardSetupRecord & {
    deck: ComponentSummaryQueryResult
    trucks: ComponentSummaryQueryResult
    wheels: ComponentSummaryQueryResult
    bearings: ComponentSummaryQueryResult
    hardware: ComponentSummaryQueryResult
    griptape: ComponentSummaryQueryResult
}

type BoardFullQueryResult = BoardSetupRecord & {
    deck: ComponentQueryResult
    trucks: ComponentQueryResult
    wheels: ComponentQueryResult
    bearings: ComponentQueryResult
    hardware: ComponentQueryResult
    griptape: ComponentQueryResult
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

type ComponentQueryResult = ComponentRecord & {
    componentAttributes: ComponentAttributesQueryResult
}

type ComponentSummaryQueryResult = ComponentRecord

type ComponentAttributesQueryResult = ComponentAttributesRecord & {
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
