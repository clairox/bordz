import { z } from 'zod'

const UpdateDefaultAddressFormSchema = z.object({
    defaultAddressId: z.string(),
})

export default UpdateDefaultAddressFormSchema
