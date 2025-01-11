import { z } from 'zod'

const UpdatePersonalDetailsFormSchema = z.object({
    email: z
        .string()
        .min(1, 'Please enter an email address.')
        .email('Invalid email address.'),
    firstName: z
        .string()
        .min(1, 'Please enter your first name.')
        .max(50, 'First name must not exceed 50 characters.')
        .regex(/^[a-zA-Z]+$/, 'First name can only contain letters.'),
    lastName: z
        .string()
        .min(1, 'Please enter your last name.')
        .max(50, 'Last name must not exceed 50 characters.')
        .regex(/^[a-zA-Z]+$/, 'Last name can only contain letters.'),
    phone: z.string().optional(),
})

export default UpdatePersonalDetailsFormSchema
