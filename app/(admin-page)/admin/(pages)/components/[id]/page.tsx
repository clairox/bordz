import fetchAbsolute from '@/lib/fetchAbsolute'

type ComponentPageProps = {
    params: { id: string }
}

const fetchComponent = async (id: string) => {
    const response = await fetchAbsolute(`/components/${id}`)

    if (!response.ok) {
        throw response
    }

    return await response.json()
}

const ComponentPage: React.FC<ComponentPageProps> = async ({ params }) => {
    const component = await fetchComponent(params.id)

    return (
        <div>
            <h1>{component.title}</h1>
        </div>
    )
}

export default ComponentPage
