import { z } from 'zod'

const AdminUpdateBoardComponentFormSchema = z.object({
    title: z
        .string()
        .min(1, 'Please enter a title.')
        .max(100, 'Title must not exceed 50 characters.'),
    price: z.string().min(1, 'Please enter a price.'),
    images: z.array(z.string()),
    model: z.string().optional(),
    description: z.string().optional(),
    specifications: z.array(z.string()),
    totalInventory: z.string().min(1, 'Please enter a quantity.'),
    category: z.string().min(1, 'Please enter a category.'),
    vendor: z.string().min(1, 'Please enter a vendor.'),
    size: z.string().min(1, 'Please enter a size.'),
    color: z.string().min(1, 'Please enter a color.'),
})

export default AdminUpdateBoardComponentFormSchema
