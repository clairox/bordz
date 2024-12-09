import { z } from 'zod'

const AddressFormSchema = z.object({
    fullName: z
        .string()
        .min(1, 'Please enter a name.')
        .max(100, 'Name must not exceed 100 characters.'),
    line1: z
        .string()
        .min(1, 'Please enter an address.')
        .max(255, 'Invalid address.'),
    line2: z.string().max(255, 'Invalid address.').nullish(),
    city: z.string().min(1, 'Please enter a city.').max(100, 'Invalid city.'),
    state: z.string().min(1, 'Please select a state.'),
    postalCode: z
        .string()
        .min(1, 'Please enter a postal code.')
        .max(12, 'Invalid postal code.'),
    phone: z.string().max(16, 'Invalid phone number.').nullish(),
})

export default AddressFormSchema
