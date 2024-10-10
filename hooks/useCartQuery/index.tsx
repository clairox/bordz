import { CartContext } from '@/providers/Cart'
import { useContext } from 'react'

const useCartQuery = () => useContext(CartContext)

export default useCartQuery
