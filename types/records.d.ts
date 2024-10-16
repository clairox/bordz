import { AddressTable } from '@/drizzle/schema/address'
import { BoardSetupTable } from '@/drizzle/schema/boardSetup'
import { CartLineItemTable, CartTable } from '@/drizzle/schema/cart'
import { CheckoutLineItemTable, CheckoutTable } from '@/drizzle/schema/checkout'
import {
    CategoryTable,
    ColorTable,
    ComponentAttributesTable,
    ComponentTable,
    SizeTable,
    VendorTable,
} from '@/drizzle/schema/component'
import { OrderLineItemTable, OrderTable } from '@/drizzle/schema/order'
import { ProductTable } from '@/drizzle/schema/product'
import { CustomerTable, UserTable } from '@/drizzle/schema/user'
import { WishlistLineItemTable, WishlistTable } from '@/drizzle/schema/wishlist'

type AddressRecord = typeof AddressTable.$inferSelect
type BoardSetupRecord = typeof BoardSetupTable.$inferSelect
type CartRecord = typeof CartTable.$inferSelect
type CartLineRecord = typeof CartLineItemTable.$inferSelect
type CategoryRecord = typeof CategoryTable.$inferSelect
type CheckoutRecord = typeof CheckoutTable.$inferSelect
type CheckoutLineRecord = typeof CheckoutLineItemTable.$inferSelect
type ColorRecord = typeof ColorTable.$inferSelect
type ComponentRecord = typeof ComponentTable.$inferSelect
type ComponentAttributesRecord = typeof ComponentAttributesTable.$inferSelect
type OrderRecord = typeof OrderTable.$inferSelect
type OrderLineRecord = typeof OrderLineItemTable.$inferSelect
type ProductRecord = typeof ProductTable.$inferSelect
type SizeRecord = typeof SizeTable.$inferSelect
type UserRecord = typeof UserTable.$inferSelect
type CustomerRecord = typeof CustomerTable.$inferSelect
type VendorRecord = typeof VendorTable.$inferSelect
type WishlistRecord = typeof WishlistTable.$inferSelect
type WishlistLineRecord = typeof WishlistLineItemTable.$inferSelect
