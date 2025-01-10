import { useMemo } from 'react'

export const useCombinedPages = <T extends object>(pages: Page<T>[]): T[] => {
    return useMemo(() => {
        const data: T[] = []
        pages.forEach(page => data.push(...page.data))

        return data
    }, [pages])
}
