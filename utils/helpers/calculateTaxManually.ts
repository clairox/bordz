import { SHIPPING_COST } from '@/utils/constants'

const calculateTaxManually = (amount: number) => {
    const taxRate = 0.08875
    const totalTax = (amount + SHIPPING_COST) * taxRate

    return Math.ceil(totalTax)
}

export default calculateTaxManually
