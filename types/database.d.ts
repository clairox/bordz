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
type CartRecord = typeof Carts.$inferSelect
type CartLineRecord = typeof CartLines.$inferSelect
type CategoryRecord = typeof Categories.$inferSelect
type CheckoutRecord = typeof Checkouts.$inferSelect
type CheckoutLineRecord = typeof CheckoutLines.$inferSelect
type ColorRecord = typeof Colors.$inferSelect
type BoardComponentRecord = typeof BoardComponents.$inferSelect
type BoardComponentAttrsRecord = typeof BoardComponentAttrs.$inferSelect
type OrderRecord = typeof Orders.$inferSelect
type OrderLineRecord = typeof OrderLines.$inferSelect
type ProductRecord = typeof Products.$inferSelect
type SizeRecord = typeof Sizes.$inferSelect
type CustomerRecord = typeof Customers.$inferSelect
type VendorRecord = typeof Vendors.$inferSelect
type WishlistRecord = typeof Wishlists.$inferSelect
type WishlistLineRecord = typeof WishlistItems.$inferSelect
