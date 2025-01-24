import {
    CreateBoardRecordArgs,
    CreateCartRecordArgs,
    CreateProductRecordArgs,
    UpdateCheckoutRecordArgs,
} from './database'

type CreateBoardValues = CreateBoardRecordArgs
type CreateCartValues = CreateCartRecordArgs
type CreateProductValues = CreateProductRecordArgs
type CreateWishlistValues = CreateWishlistRecordArgs

type AddCartLineValues = {
    productId: string
    quantity: number
}
type AddWishlistItemValues = {
    productId: string
}

type UpdateCheckoutValues = Omit<
    UpdateCheckoutRecordArgs,
    'total' | 'totalShipping' | 'totalTax' | 'completedAt'
>
type UpdateProductValues = UpdateProductRecordArgs
