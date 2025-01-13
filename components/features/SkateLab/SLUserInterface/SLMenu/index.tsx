'use client'

import { useEffect, useState } from 'react'

import { useSkateLabContext } from '@/context/SkateLabContext'
import SLMenuNav from './SLMenuNav'
import SLMenuSection from './SLMenuSection'
import { CATEGORIES } from '@/utils/constants'
import { getCategoryFromType } from '@/utils/domain'

const SLMenu: React.FC = () => {
    const { activeComponentType } = useSkateLabContext()

    const [currentSection, setCurrentSection] = useState<Category['label']>(
        () => {
            if (activeComponentType === 'none') {
                return CATEGORIES[0]
            }

            return getCategoryFromType(activeComponentType)
        }
    )

    useEffect(() => {
        if (activeComponentType !== 'none') {
            setCurrentSection(getCategoryFromType(activeComponentType))
        }
    }, [activeComponentType])

    return (
        <div className="absolute left-0 w-56 h-full border-r border-black pointer-events-auto">
            <SLMenuNav currentSection={currentSection} />
            <SLMenuSection section={currentSection} />
        </div>
    )
}

export default SLMenu
