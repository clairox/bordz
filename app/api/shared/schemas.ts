import { z } from 'zod'

export const PostAddressSchema = z.object({
    ownerId: z.string().optional(),
    fullName: z.string(),
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    countryCode: z.string().default('US'),
    postalCode: z.string(),
    isCustomerDefault: z.boolean().optional(),
})
export const PostBoardSchema = z.object({
    productId: z.string(),
    deckId: z.string(),
    trucksId: z.string(),
    wheelsId: z.string(),
    bearingsId: z.string(),
    hardwareId: z.string(),
    griptapeId: z.string(),
})
export const PostBoardComponentSchema = z.object({
    title: z.string(),
    price: z.number(),
    compareAtPrice: z.number().optional(),
    images: z.array(z.string()),
    model: z.string().optional(),
    description: z.string().optional(),
    specifications: z.array(z.string()),
    totalInventory: z.number(),
    category: z.string(),
    vendor: z.string(),
    size: z.string(),
    color: z.string(),
})
export const PostCartLineSchema = z.object({
    productId: z.string(),
    quantity: z.number(),
})
export const PostColorSchema = z.object({
    label: z.string(),
    value: z.string(),
})
export const PostCustomerSchema = z.object({
    email: z.string().email(),
    userId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string().optional(),
})
export const PostPaymentIntentSchema = z.object({
    total: z.number(),
})
export const PostProductSchema = z.object({
    title: z.string(),
    price: z.number(),
    compareAtPrice: z.number().optional(),
    featuredImage: z.string().optional(),
    type: z.enum(['BOARD', 'OTHER']),
    availableForSale: z.boolean().optional(),
    isPublic: z.boolean().optional(),
})
export const PostSessionCart = z.object({
    customerId: z.string().optional(),
})
export const PostSessionWishlist = z.object({
    customerId: z.string().optional(),
})
export const PostSizeSchema = z.object({
    size: z.string(),
})
export const PostValidateSessionCookiesSchema = z.object({
    customerId: z.string(),
    cartId: z.string(),
    wishlistId: z.string(),
})
export const PostVendorSchema = z.object({
    name: z.string(),
})
export const PostWishlistItemSchema = z.object({
    productId: z.string(),
})

export const PatchAddressSchema = PostAddressSchema.omit({
    ownerId: true,
}).partial()
export const PatchBoardComponentSchema = PostBoardComponentSchema.partial()
export const PatchCheckoutSchema = z
    .object({
        email: z.string().email(),
        subtotal: z.number(),
        cartId: z.string(),
        orderId: z.string(),
        paymentIntentId: z.string(),
        shippingAddressId: z.string(),
    })
    .partial()
export const PatchCustomerSchema = PostCustomerSchema.omit({
    userId: true,
}).partial()
export const PatchOrderSchema = z
    .object({
        email: z.string().email(),
        phone: z.string(),
        totalShipping: z.number(),
        totalTax: z.number(),
        customerId: z.string(),
        shippingAddressId: z.string(),
    })
    .partial()
export const PatchProductSchema = PostProductSchema.partial()

export const DeleteBoardComponentsSchema = z.object({
    ids: z.array(z.string()),
})
export const DeleteCustomersSchema = z.object({
    ids: z.array(z.string()),
})
export const DeleteOrdersSchema = z.object({
    ids: z.array(z.string()),
})
export const DeleteProductsSchema = z.object({
    ids: z.array(z.string()),
})
