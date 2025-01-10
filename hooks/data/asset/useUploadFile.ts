import { useSupabase } from '@/context/SupabaseContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type UseUploadFileArgs = {
    bucket: string
    folder?: string
    file: File
}

export const useUploadFile = () => {
    const supabase = useSupabase()
    const queryClient = useQueryClient()

    const uploadFile = async ({ bucket, folder, file }: UseUploadFileArgs) => {
        const path = folder ? folder + '/' + file.name : file.name
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(path, file)

        if (error) {
            throw error
        }

        return data.path
    }

    return useMutation<string, Error, UseUploadFileArgs>({
        mutationFn: uploadFile,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['assets'] }),
    })
}
