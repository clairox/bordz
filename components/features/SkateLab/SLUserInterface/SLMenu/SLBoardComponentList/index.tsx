'use client'

import { ArrowsOutSimple } from '@phosphor-icons/react'

import PriceRepr from '@/components/common/PriceRepr'
import { useSkateLabContext } from '@/context/SkateLabContext'
import { getTypeFromCategory } from '@/utils/domain'
import StoredPreviewImage from '@/components/common/StoredPreviewImage'
import { BoardComponentDialog } from '@/components/features/BoardComponent/BoardComponentDialog'

type SLBoardComponentListProps = {
    boardComponents: BoardComponent[]
}

const SLBoardComponentList: React.FC<SLBoardComponentListProps> = ({
    boardComponents,
}) => {
    const { selectedBoardComponents, selectBoardComponent } =
        useSkateLabContext()

    return (
        <div className="grid auto-rows-min h-fit">
            {boardComponents.map(boardComponent => {
                let isSelected = false
                const selectedComponentsValues = Object.values(
                    selectedBoardComponents
                )

                for (let i = 0; i < selectedComponentsValues.length; i++) {
                    if (selectedComponentsValues[i]?.id === boardComponent.id) {
                        isSelected = true
                        break
                    }
                }

                return (
                    <SLBoardComponentCard
                        boardComponent={boardComponent}
                        selectBoardComponent={selectBoardComponent}
                        isSelected={isSelected}
                        key={boardComponent.id}
                    />
                )
            })}
        </div>
    )
}

type SLBoardComponentCardProps = {
    boardComponent: BoardComponent
    isSelected: boolean
    selectBoardComponent: (
        type: BoardComponentType,
        boardComponent: BoardComponent
    ) => void
}

const SLBoardComponentCard: React.FC<SLBoardComponentCardProps> = ({
    boardComponent,
    isSelected,
    selectBoardComponent,
}) => {
    const category = boardComponent.category.label

    const handleBoardComponentSelection = () => {
        const typeFromCategory = getTypeFromCategory(category)

        selectBoardComponent(typeFromCategory, boardComponent)
    }

    return (
        <article
            onClick={handleBoardComponentSelection}
            className={`flex flex-col w-full border-b border-gray-400 last:border-none ${
                isSelected
                    ? 'bg-sky-100 hover:bg-sky-200'
                    : 'bg-white hover:bg-gray-100'
            }`}
        >
            <div className="border-b border-gray-400">
                <StoredPreviewImage
                    path={boardComponent.images?.[0]}
                    alt={`Skateboard ${getTypeFromCategory(category)}`}
                />
            </div>
            <div className="flex flex-col gap-[1px] px-4 pt-3 pb-2 text-left">
                <h3 className="line-clamp-2 text-sm">{boardComponent.title}</h3>
                <div className="flex justify-between items-center">
                    <div className="font-bold text-lg">
                        <span
                            className={`${
                                boardComponent.compareAtPrice &&
                                'font-normal text-base text-red-500'
                            }`}
                        >
                            {boardComponent.availableForSale ? (
                                <PriceRepr
                                    isPreSalePrice={
                                        boardComponent.compareAtPrice !=
                                        undefined
                                    }
                                    value={boardComponent.price}
                                />
                            ) : (
                                <div>Out of stock</div>
                            )}
                        </span>

                        {boardComponent.compareAtPrice && (
                            <span className="ml-1">
                                <PriceRepr value={boardComponent.price / 5} />
                            </span>
                        )}
                    </div>
                    <BoardComponentDialog
                        trigger={<ArrowsOutSimple size={22} weight="light" />}
                        boardComponent={boardComponent}
                    />
                </div>
            </div>
        </article>
    )
}

export default SLBoardComponentList
