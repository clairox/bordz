import { calculateTotalPages } from './calculateTotalPages'

export const calculateNextPage = (
    currentPage: number,
    pageSize: number,
    itemCount: number
): number | null => {
    const totalPages = calculateTotalPages(pageSize, itemCount)
    const nextPage = totalPages > currentPage ? currentPage + 1 : null
    return nextPage
}
