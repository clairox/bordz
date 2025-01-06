import EditComponentForm from '@/components/Forms/EditComponentForm'
import { fetchComponent } from '@/lib/api'

type ComponentPageProps = {
    params: { id: string }
}

const ComponentPage: React.FC<ComponentPageProps> = async ({ params }) => {
    const component = await fetchComponent(params.id)

    return <EditComponentForm component={component} />
}

export default ComponentPage
