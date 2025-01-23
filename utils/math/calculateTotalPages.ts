export const calculateTotalPages = (
    pageSize: number,
    itemCount: number
): number => {
    return Math.ceil(itemCount / pageSize)
}
