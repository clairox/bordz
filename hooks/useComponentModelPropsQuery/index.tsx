import { useQuery } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'

const useComponentModelPropsQuery = (id?: string) => {
    return useQuery({
        queryKey: ['component', id],
        queryFn: async () => {
            if (!id) {
                return {
                    color: {
                        label: 'white',
                        value: '#ffffff',
                    },
                }
            }

            try {
                const res = await fetchAbsolute(`/components/${id}`)

                if (!res.ok) {
                    throw res
                }

                const data: Component = await res.json()
                return data.componentAttributes
            } catch (error) {
                throw error
            }
        },
    })
}

export default useComponentModelPropsQuery
