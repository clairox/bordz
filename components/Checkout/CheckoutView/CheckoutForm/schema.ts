import { z } from 'zod'

const CheckoutFormSchema = z.object({
    email: z
        .string()
        .min(1, 'Please enter an email address')
        .email('Invalid email address'),
})

export default CheckoutFormSchema
