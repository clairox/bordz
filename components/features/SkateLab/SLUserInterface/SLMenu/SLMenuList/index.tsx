'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import PriceRepr from '@/components/common/PriceRepr'
import { useSkateLabContext } from '@/context/SkateLabContext'
import { useSupabase } from '@/context/SupabaseContext'
import { getTypeFromCategory } from '@/utils/domain'

type SLMenuListProps = {
    components: Component[]
}

const SLMenuList: React.FC<SLMenuListProps> = ({ components }) => {
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
                    <SLMenuListItem
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

type SLMenuListItemProps = {
    component: Component
    isSelected: boolean
    selectComponent: (type: ComponentType, component: Component) => void
}

const SLMenuListItem: React.FC<SLMenuListItemProps> = ({
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
            {component.images && (
                <StoredImage
                    path={component.images[0]}
                    alt={`Skateboard ${getTypeFromCategory(category)}`}
                />
            )}
            <div className="flex flex-col gap-[1px] px-4 pt-3 pb-4 border-t border-gray-300 text-left">
                <h3 className="line-clamp-2 text-sm">{component.title}</h3>
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
            </div>
        </div>
    )
}

type StoredImageProps = {
    path: string
    alt: string
}

const StoredImage: React.FC<StoredImageProps> = ({ path, alt }) => {
    const supabase = useSupabase()

    const [src, setSrc] = useState<string | undefined>(undefined)

    useEffect(() => {
        const {
            data: { publicUrl },
        } = supabase.storage
            .from('images')
            .getPublicUrl(path, { download: true })

        if (publicUrl) {
            setSrc(publicUrl)
        }
    }, [path, supabase])

    if (!src) {
        return <div>Loading...</div>
    }

    return (
        <Image
            src={src}
            alt={alt}
            sizes="100vw"
            width="650"
            height="770"
            style={{ width: '100%', height: 'auto' }}
        />
    )
}

export default SLMenuList
