'use client'

import { useContext } from 'react'

import { CartContext } from '@/context/CartContext'
import { CustomerContext } from '@/context/CustomerContext'
import { WishlistContext } from '@/context/WishlistContext'

export const useSessionCart = () => useContext(CartContext)
export const useSessionCustomer = () => useContext(CustomerContext)
export const useSessionWishlist = () => useContext(WishlistContext)
