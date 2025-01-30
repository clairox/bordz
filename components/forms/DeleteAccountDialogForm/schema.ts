import z from 'zod'

const DeleteAccountFormSchema = z.object({
    password: z.string().min(1, 'Please enter your password.'),
})

export default DeleteAccountFormSchema
