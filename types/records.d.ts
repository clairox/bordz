import { CartLineItemTable, CartTable } from '@/drizzle/schema/cart'
import { CheckoutTable } from '@/drizzle/schema/checkout'
import { ProductTable } from '@/drizzle/schema/product'

type ProductRecord = typeof ProductTable.$inferSelect
type CartRecord = typeof CartTable.$inferSelect
type CartLineRecord = typeof CartLineItemTable.$inferSelect
type CheckoutRecord = typeof CheckoutTable.$inferSelect
