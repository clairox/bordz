import { useSupabase } from '@/context/SupabaseContext'
import { useMutation } from '@tanstack/react-query'

type UseLoginVariables = {
    email: string
    password: string
}

const useLogin = () => {
    const supabase = useSupabase()

    return useMutation<void, Error, UseLoginVariables>({
        mutationFn: async ({ email, password }) => {
            try {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })

                if (error) {
                    throw error
                }
            } catch (error) {
                throw error
            }
        },
    })
}

export default useLogin
