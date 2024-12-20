'use client'

import { useSkateLabContext } from '@/app/(skate-lab-page)/lab/SkateLab/SkateLabContext'
import { CATEGORIES } from '@/app/(skate-lab-page)/lab/SkateLab/utils/constants'
import { getTypeFromCategory } from '@/utils/helpers'

type SkateLabUIMenuNavProps = {
    currentSection: Category['label']
}
const SkateLabUIMenuNav: React.FC<SkateLabUIMenuNavProps> = ({
    currentSection,
}) => {
    const { setActiveComponentType } = useSkateLabContext()

    const isFirstSection = CATEGORIES.indexOf(currentSection) === 0
    const isLastSection =
        CATEGORIES.indexOf(currentSection) === CATEGORIES.length - 1

    const prevButtonColorClass = isFirstSection ? 'text-gray-500' : 'text-black'
    const nextButtonColorClass = isLastSection ? 'text-gray-500' : 'text-black'

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
        <div className="z-10 fixed px-2 flex justify-between items-center w-[inherit] h-12 border-b border-black">
            <h2 className="text-2xl">{currentSection}</h2>
            <div className="flex items-center gap-2 text-2xl">
                <button
                    disabled={isFirstSection}
                    onClick={() => navigate('prev')}
                    className={`${prevButtonColorClass}`}
                >
                    Prev
                </button>
                <button
                    disabled={isLastSection}
                    onClick={() => navigate('next')}
                    className={`${nextButtonColorClass}`}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default SkateLabUIMenuNav
