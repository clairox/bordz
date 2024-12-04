'use client'

import { useEffect, useState } from 'react'
import { useSkateLabContext } from '../../SkateLabContext'
import SkateLabUIMenuNav from './SkateLabUIMenuNav'
import SkateLabUIMenuSection from './SkateLabUIMenuSection'
import { CATEGORIES } from '../../utils/constants'
import { getCategoryFromType } from '@/utils/helpers'

const SkateLabUIMenu: React.FC = () => {
    const { activeComponentType } = useSkateLabContext()

    // TODO: Make sure this works
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
        <div className="pointer-events-auto">
            <SkateLabUIMenuNav currentSection={currentSection} />
            <SkateLabUIMenuSection section={currentSection} />
        </div>
    )
}

export default SkateLabUIMenu
