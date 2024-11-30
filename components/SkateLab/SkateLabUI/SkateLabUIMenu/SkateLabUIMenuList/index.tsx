import { useSkateLabContext } from '@/components/SkateLab/SkateLabContext'
import { getTypeFromCategory } from '@/utils/helpers'

type SkateLabUIMenuListProps = {
    components: Component[]
}

const SkateLabUIMenuList: React.FC<SkateLabUIMenuListProps> = ({
    components,
}) => {
    const { selectedComponents, selectComponent } = useSkateLabContext()

    return (
        <div className="flex flex-col gap-[1px] w-full bg-black">
            {components.map(component => {
                let isSelected = false
                const selectedComponentsValues =
                    Object.values(selectedComponents)

                for (let i = 0; i < selectedComponentsValues.length; i++) {
                    if (selectedComponentsValues[i]?.id === component.id) {
                        isSelected = true
                        break
                    }
                }

                return (
                    <SkateLabUIMenuListItem
                        component={component}
                        selectComponent={selectComponent}
                        isSelected={isSelected}
                        key={component.id}
                    />
                )
            })}
        </div>
    )
}

type SkateLabUIMenuListItemProps = {
    component: Component
    isSelected: boolean
    selectComponent: (type: ComponentType, component: Component) => void
}

const SkateLabUIMenuListItem: React.FC<SkateLabUIMenuListItemProps> = ({
    component,
    isSelected,
    selectComponent,
}) => {
    const handleComponentSelection = () => {
        const category = component.componentAttributes.category.label
        const typeFromCategory = getTypeFromCategory(category)

        selectComponent(typeFromCategory, component)
    }
    return (
        <div
            onClick={handleComponentSelection}
            className={`flex flex-col w-full h-60 ${isSelected ? 'bg-sky-100 hover:bg-sky-200' : 'bg-white hover:bg-gray-100'}`}
        >
            <h3 className="text-center">{component.title}</h3>
        </div>
    )
}

export default SkateLabUIMenuList
