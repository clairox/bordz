export const calculateRemainingGridSpan = (
    itemCount: number,
    trackSize: number
): number => {
    if (itemCount > trackSize) {
        return trackSize - (itemCount % trackSize)
    }

    return trackSize - itemCount
}
