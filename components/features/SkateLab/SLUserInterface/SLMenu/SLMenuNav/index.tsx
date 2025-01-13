'use client'

import { useSkateLabContext } from '@/context/SkateLabContext'
import { CATEGORIES } from '@/utils/constants'
import { getTypeFromCategory } from '@/utils/domain'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

type SLMenuNavProps = {
    currentSection: Category['label']
}
const SLMenuNav: React.FC<SLMenuNavProps> = ({ currentSection }) => {
    const { setActiveComponentType } = useSkateLabContext()

    const isFirstSection = CATEGORIES.indexOf(currentSection) === 0
    const isLastSection =
        CATEGORIES.indexOf(currentSection) === CATEGORIES.length - 1

    const prevButtonColorClass = isFirstSection
        ? 'text-gray-300 bg-gray-100'
        : 'text-black'
    const nextButtonColorClass = isLastSection
        ? 'text-gray-300 bg-gray-100 border-r border-black'
        : 'text-black'

    const navigate = (direction: 'prev' | 'next') => {
        let sectionToNavigateTo: Category['label']

        if (direction === 'prev') {
            if (isFirstSection) {
                return
            }

            sectionToNavigateTo =
                CATEGORIES[CATEGORIES.indexOf(currentSection) - 1]
        } else if (direction === 'next') {
            if (isLastSection) {
                return
            }

            sectionToNavigateTo =
                CATEGORIES[CATEGORIES.indexOf(currentSection) + 1]
        } else {
            throw new Error(`Invalid direction input: ${direction}`)
        }

        setActiveComponentType(getTypeFromCategory(sectionToNavigateTo))
    }

    return (
        <div className="z-10 fixed flex justify-between items-center w-[inherit] h-10 border-b border-black">
            <div className="flex items-end pl-2 pb-[2px] h-full">
                <h2 className="font-[400] text-[23px]/[31px]">
                    {currentSection}
                </h2>
            </div>
            <div className="flex items-center h-full text-2xl">
                <button
                    disabled={isFirstSection}
                    onClick={() => navigate('prev')}
                    className={`flex justify-center items-center w-10 h-full border-l border-black ${prevButtonColorClass}`}
                >
                    <CaretLeft size={28} weight="regular" />
                </button>
                <button
                    disabled={isLastSection}
                    onClick={() => navigate('next')}
                    className={`flex justify-center items-center w-10 h-full border-l border-black ${nextButtonColorClass}`}
                >
                    <CaretRight size={28} weight="regular" />
                </button>
            </div>
        </div>
    )
}

export default SLMenuNav
