import {
    CreateAddressRecordArgs,
    CreateBoardComponentRecordArgs,
    CreateBoardRecordArgs,
    CreateCartRecordArgs,
    CreateCustomerRecordArgs,
    CreateOrderRecordArgs,
    CreateProductRecordArgs,
    UpdateAddressRecordArgs,
    UpdateBoardComponentRecordArgs,
    UpdateCheckoutRecordArgs,
    UpdateCustomerRecordArgs,
    UpdateOrderRecordArgs,
    UpdateProductRecordArgs,
} from './database'

type CreateAddressValues = CreateAddressRecordArgs & {
    isCustomerDefault?: boolean
}
type CreateBoardValues = CreateBoardRecordArgs
type CreateBoardComponentValues = Omit<CreateBoardComponentRecordArgs, 'handle'>
type CreateCartValues = CreateCartRecordArgs
type CreateCustomerValues = CreateCustomerRecordArgs
type CreateOrderValues = CreateOrderRecordArgs
type CreatePaymentIntentValues = { total: number }
type CreateProductValues = CreateProductRecordArgs
type CreateWishlistValues = CreateWishlistRecordArgs

type AddCartLineValues = {
    productId: string
    quantity: number
}
type AddWishlistItemValues = {
    productId: string
}

type UpdateAddressValues = UpdateAddressRecordArgs & {
    isCustomerDefault?: boolean
}
type UpdateBoardComponentValues = Omit<UpdateBoardComponentRecordArgs, 'handle'>
type UpdateCheckoutValues = Omit<
    UpdateCheckoutRecordArgs,
    'total' | 'totalShipping' | 'totalTax' | 'completedAt'
>
type UpdateCustomerValues = UpdateCustomerRecordArgs
type UpdateOrderValues = UpdateOrderRecordArgs
type UpdateProductValues = UpdateProductRecordArgs
