export const toPriceRepr = (value: number): string =>
    '$' + (value * 0.01).toFixed(2)
