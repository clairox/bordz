import { z } from 'zod'

// TODO: Add shipping address

const UpdateOrderSchema = z.object({
    email: z
        .string()
        .min(1, 'Please enter an email address.')
        .email('Invalid email address.'),
    phone: z.string().nullish(),
    totalShipping: z.string().min(1, 'Please enter a shipping amount.'),
    totalTax: z.string().min(1, 'Please enter a tax amount.'),
})

export default UpdateOrderSchema
