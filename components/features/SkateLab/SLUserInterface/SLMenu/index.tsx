'use client'

import { useEffect, useState } from 'react'

import { useSkateLabContext } from '@/context/SkateLabContext'
import SLMenuNav from './SLMenuNav'
import SLMenuSection from './SLMenuSection'
import { CATEGORIES } from '@/utils/constants'
import { getCategoryFromType } from '@/utils/domain'

const SLMenu: React.FC = () => {
    const { activeBoardComponentType } = useSkateLabContext()

    const [currentSection, setCurrentSection] = useState<Category['label']>(
        () => {
            if (activeBoardComponentType === 'none') {
                return CATEGORIES[0]
            }

            return getCategoryFromType(activeBoardComponentType)
        }
    )

    useEffect(() => {
        if (activeBoardComponentType !== 'none') {
            setCurrentSection(getCategoryFromType(activeBoardComponentType))
        }
    }, [activeBoardComponentType])

    return (
        <div className="absolute left-0 w-56 h-full border-r border-black pointer-events-auto">
            <SLMenuNav currentSection={currentSection} />
            <SLMenuSection section={currentSection} />
        </div>
    )
}

export default SLMenu
