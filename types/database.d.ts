import { Addresses } from '@/drizzle/schema/address'
import { Boards } from '@/drizzle/schema/board'
import { CartLines, Carts } from '@/drizzle/schema/cart'
import { CheckoutLines, Checkouts } from '@/drizzle/schema/checkout'
import {
    Categories,
    Colors,
    BoardComponentAttrs,
    BoardComponents,
    Sizes,
    Vendors,
} from '@/drizzle/schema/boardComponent'
import { OrderLines, Orders } from '@/drizzle/schema/order'
import { Products } from '@/drizzle/schema/product'
import { Customers } from '@/drizzle/schema/customer'
import { WishlistItems, Wishlists } from '@/drizzle/schema/wishlist'

type AddressRecord = typeof Addresses.$inferSelect
type BoardRecord = typeof Boards.$inferSelect
type BoardComponentRecord = typeof BoardComponents.$inferSelect
type BoardComponentAttrsRecord = typeof BoardComponentAttrs.$inferSelect
type CartRecord = typeof Carts.$inferSelect
type CartLineRecord = typeof CartLines.$inferSelect
type CategoryRecord = typeof Categories.$inferSelect
type CheckoutRecord = typeof Checkouts.$inferSelect
type CheckoutLineRecord = typeof CheckoutLines.$inferSelect
type ColorRecord = typeof Colors.$inferSelect
type OrderRecord = typeof Orders.$inferSelect
type OrderLineRecord = typeof OrderLines.$inferSelect
type ProductRecord = typeof Products.$inferSelect
type SizeRecord = typeof Sizes.$inferSelect
type CustomerRecord = typeof Customers.$inferSelect
type VendorRecord = typeof Vendors.$inferSelect
type WishlistRecord = typeof Wishlists.$inferSelect
type WishlistLineRecord = typeof WishlistItems.$inferSelect

/* Create */

type DefaultOmissions = 'id' | 'createdAt' | 'updatedAt'

type CreateBoardRecordArgs = Omit<typeof Boards.$inferInsert, DefaultOmissions>
type CreateBoardComponentRecordArgs = Omit<
    typeof BoardComponents.$inferInsert & {
        category: CategoryRecord['id']
        vendor: VendorRecord['id']
        size: SizeRecord['id']
        color: ColorRecord['id']
    },
    DefaultOmissions | 'usageCount' | 'availableForSale'
>
type CreateBoardComponentAttrsRecordArgs = Omit<
    typeof BoardComponentAttrs.$inferInsert,
    DefaultOmissions
>
type CreateCartRecordArgs = Omit<typeof Carts.$inferInsert, DefaultOmissions>
type CreateCartLineRecordArgs = Pick<
    typeof CartLines.$inferInsert,
    'cartId' | 'productId' | 'quantity'
>
type CreateCheckoutRecordArgs = Omit<
    typeof Checkouts.$inferInsert,
    DefaultOmissions
>
type CreateCheckoutLineRecordArgs = Pick<
    typeof CheckoutLines.$inferInsert & { productId: string },
    'checkoutId' | 'productId' | 'quantity'
>
type CreateProductRecordArgs = Omit<
    typeof Products.$inferInsert & { type: 'BOARD' | 'OTHER' },
    DefaultOmissions | 'productType'
>
type CreateWishlistRecordArgs = Omit<
    typeof Wishlists.$inferInsert,
    DefaultOmissions
>
type CreateWishlistItemRecordArgs = Omit<
    typeof WishlistItems.$inferInsert,
    DefaultOmissions
>

/* Update */

type UpdateBoardComponentRecordArgs = Partial<CreateBoardComponentRecordArgs>
type UpdateBoardComponentAttrsRecordArgs =
    Partial<CreateBoardComponentAttrsRecordArgs>
type UpdateCartRecordArgs = Partial<Omit<CreateCartRecordArgs, 'ownerId'>>
type UpdateCheckoutRecordArgs = Partial<
    Omit<CreateCheckoutRecordArgs, 'customerId'>
>
type UpdateProductRecordArgs = Partial<
    Omit<CreateProductRecordArgs, 'productType'>
>
