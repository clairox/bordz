import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { useComponentSelector } from '../ComponentSelectorContext'

const SkateLabComponentSelectorNavigation: React.FC = () => {
    const { categories, currentCategory, setCurrentCategory } =
        useComponentSelector()

    const isFirstCategory = categories.indexOf(currentCategory) === 0
    const isLastCategory =
        categories.indexOf(currentCategory) === categories.length - 1

    const prevArrowButtonColor = isFirstCategory ? 'lightgray' : 'black'
    const nextArrowButtonColor = isLastCategory ? 'lightgray' : 'black'

    const arrowButtonWeight = 'bold'

    const handlePrevArrowButtonClick = () => {
        const prevCategory = categories[categories.indexOf(currentCategory) - 1]
        setCurrentCategory(prevCategory)
    }

    const handleNextArrowButtonClick = () => {
        const nextCategory = categories[categories.indexOf(currentCategory) + 1]
        setCurrentCategory(nextCategory)
    }

    return (
        <div className="flex justify-between gap-2">
            <h2 className="text-3xl font-semibold">{currentCategory}</h2>
            <div className="flex items-center gap-2 text-2xl">
                <button
                    onClick={handlePrevArrowButtonClick}
                    disabled={isFirstCategory}
                >
                    <ArrowLeft
                        color={prevArrowButtonColor}
                        weight={arrowButtonWeight}
                    />
                </button>
                <button
                    onClick={handleNextArrowButtonClick}
                    disabled={isLastCategory}
                >
                    <ArrowRight
                        color={nextArrowButtonColor}
                        weight={arrowButtonWeight}
                    />
                </button>
            </div>
        </div>
    )
}

export default SkateLabComponentSelectorNavigation
