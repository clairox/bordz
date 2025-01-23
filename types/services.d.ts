import { CreateCartRecordArgs, UpdateCheckoutRecordArgs } from './database'

type CreateCartValues = CreateCartRecordArgs
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
