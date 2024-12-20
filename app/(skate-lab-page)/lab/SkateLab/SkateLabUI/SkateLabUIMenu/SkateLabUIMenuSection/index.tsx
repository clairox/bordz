'use client'

import SkateLabUIMenuList from '../SkateLabUIMenuList'
import useComponents from '@/hooks/useComponents'
import InfiniteItemList from '@/components/InfiniteItemList'
import { Fragment } from 'react'

type SkateLabUIMenuSectionProps = {
    section: Category['label']
}

const SkateLabUIMenuSection: React.FC<SkateLabUIMenuSectionProps> = ({
    section,
}) => {
    const { data, hasNextPage, fetchNextPage } = useComponents({
        size: 10,
        category: section,
    })

    return (
        <div className="relative pt-12 h-full">
            <div className="flex flex-col w-full h-full overflow-auto">
                <InfiniteItemList
                    pages={data.pages}
                    hasNextPage={hasNextPage}
                    fetchNextPage={fetchNextPage}
                    render={items => (
                        <Fragment>
                            <SkateLabUIMenuList components={items} />
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

export default SkateLabUIMenuSection
