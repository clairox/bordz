import { z } from 'zod'

const AdminLoginFormSchema = z.object({
    email: z
        .string()
        .min(1, 'Please enter an email address.')
        .email('Invalid email address.'),
    password: z.string().min(8, 'Password should be at least 8 characters.'),
})

export default AdminLoginFormSchema
