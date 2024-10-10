import { CartContext } from '@/context/cartContext'
import { useContext } from 'react'

const useCartQuery = () => useContext(CartContext)

export default useCartQuery
