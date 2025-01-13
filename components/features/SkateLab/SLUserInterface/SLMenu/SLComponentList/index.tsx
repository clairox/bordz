'use client'

import PriceRepr from '@/components/common/PriceRepr'
import { useSkateLabContext } from '@/context/SkateLabContext'
import { getTypeFromCategory } from '@/utils/domain'
import StoredPreviewImage from '@/components/common/StoredPreviewImage'
import { ComponentDialog } from '@/components/features/Component/ComponentDialog'
import { ArrowsOutSimple } from '@phosphor-icons/react'

type SLComponentListProps = {
    components: Component[]
}

const SLComponentList: React.FC<SLComponentListProps> = ({ components }) => {
    const { selectedComponents, selectComponent } = useSkateLabContext()

    return (
        <div className="grid auto-rows-min h-fit">
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
                    <SLComponentCard
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

type SLComponentCardProps = {
    component: Component
    isSelected: boolean
    selectComponent: (type: ComponentType, component: Component) => void
}

const SLComponentCard: React.FC<SLComponentCardProps> = ({
    component,
    isSelected,
    selectComponent,
}) => {
    const category = component.category.label

    const handleComponentSelection = () => {
        const typeFromCategory = getTypeFromCategory(category)

        selectComponent(typeFromCategory, component)
    }

    return (
        <div
            onClick={handleComponentSelection}
            className={`flex flex-col w-full border-b border-black last:border-none ${isSelected ? 'bg-sky-100 hover:bg-sky-200' : 'bg-white hover:bg-gray-100'}`}
        >
            <div className="border-b border-gray-400">
                <StoredPreviewImage
                    path={component.images?.[0]}
                    alt={`Skateboard ${getTypeFromCategory(category)}`}
                />
            </div>
            <div className="flex flex-col gap-[1px] px-4 pt-3 pb-2 text-left">
                <h3 className="line-clamp-2 text-sm">{component.title}</h3>
                <div className="flex justify-between items-center">
                    <div className="font-bold text-lg">
                        <span
                            className={`${component.compareAtPrice && 'font-normal text-base text-red-500'}`}
                        >
                            <PriceRepr
                                isPreSalePrice={
                                    component.compareAtPrice != undefined
                                }
                                value={component.price}
                            />
                        </span>

                        {component.compareAtPrice && (
                            <span className="ml-1">
                                <PriceRepr value={component.price / 5} />
                            </span>
                        )}
                    </div>
                    <ComponentDialog
                        trigger={<ArrowsOutSimple size={22} weight="light" />}
                        component={component}
                    />
                </div>
            </div>
        </div>
    )
}

export default SLComponentList
