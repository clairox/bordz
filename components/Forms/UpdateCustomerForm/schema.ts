import { z } from 'zod'

// TODO: Add missing fields

const UpdateCustomerFormSchema = z.object({
    // userId: z.string().min(1, 'Please enter a userId.').uuid('Invalid userId.'),
    email: z
        .string()
        .min(1, 'Please enter an email address.')
        .email('Invalid email address.'),
    // defaultAddressId: z.string().nullish(),
    // addresses: z.array(z.string()).nullish(),
    firstName: z
        .string()
        .min(1, 'Please enter a first name.')
        .max(50, 'Must not exceed 50 characters.'),
    lastName: z
        .string()
        .min(1, 'Please enter a last name.')
        .max(50, 'Must not exceed 50 characters.'),
    phone: z.string().nullish(),
})

export default UpdateCustomerFormSchema
