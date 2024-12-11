import { useMutation, useQueryClient } from '@tanstack/react-query'

const useUpdatePassword = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async () => {},
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['customer'] }),
    })
}

export default useUpdatePassword
