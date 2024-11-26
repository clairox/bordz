import { useComponentSelector } from '../ComponentSelectorContext'

type SkateLabComponentListItemProps = {
    component: Component
    isSelected?: boolean
}

const SkateLabComponentListItem: React.FC<SkateLabComponentListItemProps> = ({
    component,
    isSelected = false,
}) => {
    const { handleComponentSelect } = useComponentSelector()
    const category = component.componentAttributes.category.label

    return (
        <div
            onClick={() => handleComponentSelect(category, component)}
            className={`flex flex-col w-full h-60 ${isSelected ? 'bg-sky-100 hover:bg-sky-200' : 'bg-white hover:bg-gray-100'}`}
        >
            <h3 className="text-center">{component.title}</h3>
        </div>
    )
}

export default SkateLabComponentListItem
