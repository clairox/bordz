import { CartLineItemTable, CartTable } from '@/schema/cart'
import { CheckoutTable } from '@/schema/checkout'
import { ProductTable } from '@/schema/product'

type ProductRecord = typeof ProductTable.$inferSelect
type CartRecord = typeof CartTable.$inferSelect
type CartLineRecord = typeof CartLineItemTable.$inferSelect
type CheckoutRecord = typeof CheckoutTable.$inferSelect
