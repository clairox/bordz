import { calculateRemainingGridSpan } from '@/utils/math'
import { Fragment } from 'react'

type GridFillerProps = {
    itemCount: number
    gridTrackSize: number
}

const GridFiller: React.FC<GridFillerProps> = ({
    itemCount,
    gridTrackSize,
}) => {
    const fillSize = calculateRemainingGridSpan(itemCount, gridTrackSize)
    const colSpanClasses: Record<number, string> = {
        1: 'col-span-1',
        2: 'col-span-2',
        3: 'col-span-3',
        4: 'col-span-4',
        5: 'col-span-5',
    }

    if (fillSize === 0) {
        return <Fragment />
    }

    return (
        <div className={`${colSpanClasses[fillSize]} w-full h-full bg-white`} />
    )
}

export default GridFiller
