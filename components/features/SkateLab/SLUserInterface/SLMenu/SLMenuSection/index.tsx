'use client'

import SLBoardComponentList from '../SLBoardComponentList'
import { useBoardComponents } from '@/hooks/data/boardComponent'
import InfiniteList from '@/components/common/InfiniteList'
import { Fragment } from 'react'

type SLMenuSectionProps = {
    section: Category['label']
}

const SLMenuSection: React.FC<SLMenuSectionProps> = ({ section }) => {
    const { data, hasNextPage, fetchNextPage } = useBoardComponents({
        size: 10,
        category: section,
    })

    return (
        <div className="relative pt-10 h-full">
            <div className="flex flex-col w-full h-full overflow-auto">
                <InfiniteList
                    pages={data.pages}
                    hasNextPage={hasNextPage}
                    fetchNextPage={fetchNextPage}
                    render={items => (
                        <Fragment>
                            <SLBoardComponentList boardComponents={items} />
                            <div className="h-full border-t border-black">
                                <p className="py-2 text-center text-gray-700">
                                    Showing {items.length} of {items.length}
                                </p>
                            </div>
                        </Fragment>
                    )}
                />
            </div>
        </div>
    )
}

export default SLMenuSection
