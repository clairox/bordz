import {
    CreateBoardComponentRecordArgs,
    CreateBoardRecordArgs,
    CreateCartRecordArgs,
    CreateProductRecordArgs,
    UpdateBoardComponentRecordArgs,
    UpdateCheckoutRecordArgs,
} from './database'

type CreateBoardValues = CreateBoardRecordArgs
type CreateBoardComponentValues = CreateBoardComponentRecordArgs
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

type UpdateBoardComponentValues = UpdateBoardComponentRecordArgs
type UpdateCheckoutValues = Omit<
    UpdateCheckoutRecordArgs,
    'total' | 'totalShipping' | 'totalTax' | 'completedAt'
>
type UpdateProductValues = UpdateProductRecordArgs
