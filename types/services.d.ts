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
} from './database'

type CreateAddressValues = CreateAddressRecordArgs & {
    isCustomerDefault?: boolean
}
type CreateBoardValues = CreateBoardRecordArgs
type CreateBoardComponentValues = CreateBoardComponentRecordArgs
type CreateCartValues = CreateCartRecordArgs
type CreateCustomerValues = CreateCustomerRecordArgs
type CreateOrderValues = CreateOrderRecordArgs
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
type UpdateBoardComponentValues = UpdateBoardComponentRecordArgs
type UpdateCheckoutValues = Omit<
    UpdateCheckoutRecordArgs,
    'total' | 'totalShipping' | 'totalTax' | 'completedAt'
>
type UpdateCustomerValues = UpdateCustomerRecordArgs
type UpdateOrderValues = UpdateOrderRecordArgs
type UpdateProductValues = UpdateProductRecordArgs
