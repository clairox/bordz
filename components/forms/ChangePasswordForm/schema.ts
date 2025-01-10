import z from 'zod'

const ChangePasswordFormSchema = z
    .object({
        password: z
            .string()
            .min(1, 'Please enter a password.')
            .min(8, 'Password should be at least 8 characters.'),
        passwordConfirmation: z
            .string()
            .min(1, 'Please confirm your password.'),
    })
    .refine(
        data => {
            return data.password === data.passwordConfirmation
        },
        { message: 'Passwords do not match.', path: ['passwordConfirmation'] }
    )

export default ChangePasswordFormSchema
