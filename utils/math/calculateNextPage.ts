export const calculateNextPage = (
    currentPage: number,
    pageSize: number,
    itemCount: number
): number | undefined => {
    const totalPages = Math.ceil(itemCount / pageSize)
    const nextPage = totalPages > currentPage ? currentPage + 1 : undefined
    return nextPage
}
