import { z } from 'zod'

const AdminUpdateProductFormSchema = z.object({
    title: z
        .string()
        .min(1, 'Please enter a title.')
        .max(100, 'Title must not exceed 100 characters.'),
    featuredImage: z.string().optional(),
    price: z.string().min(1, 'Please enter a price.'),
    isPublic: z.boolean(),
})

export default AdminUpdateProductFormSchema
