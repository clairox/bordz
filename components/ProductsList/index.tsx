'use client'
import { useAddCartLineMutation, useCartQuery } from '@/hooks'
import { toPriceRepr } from '@/utils/helpers'
import { ArrowClockwise } from '@phosphor-icons/react'
import { QueryStatus, useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo } from 'react'

const ProductsList: React.FC = () => {
    const {
        data: products,
        status: productsStatus,
        refetch,
    } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:3000/api/products')

                if (!res.ok) {
                    throw res
                }

                return await res.json()
            } catch (error) {
                throw error
            }
        },
    })

    const { data: cart, status: cartStatus } = useCartQuery()

    if (productsStatus === 'error') {
        return (
            <div>
                <p>There was a problem loading your cart</p>
                <button onClick={() => refetch()} className="flex">
                    <span>Retry</span>
                    <ArrowClockwise size={22} weight="light" />
                </button>
            </div>
        )
    }

    if (productsStatus === 'pending' || products == undefined) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex justify-between w-full">
            {products.map(product => {
                return (
                    <ProductsListItem
                        product={product}
                        cartId={cart?.id}
                        cartStatus={cartStatus}
                        isInCart={
                            cart?.lines
                                ?.map(line => line.productId)
                                .includes(product.id) || false
                        }
                        key={product.id}
                    />
                )
            })}
        </div>
    )
}

type ProductsListItemProps = {
    product: Product
    cartId: string | undefined
    cartStatus: QueryStatus
    isInCart: boolean
}

const ProductsListItem: React.FC<ProductsListItemProps> = ({
    product,
    cartId,
    cartStatus,
    isInCart,
}) => {
    const { mutate: addCartLine, status: addToCartStatus } =
        useAddCartLineMutation()

    useEffect(() => {
        if (addToCartStatus === 'error') {
            //TODO: toast('There was an issue loading the cart. Please try again later')
        }
    }, [addToCartStatus])

    const addToCart = useCallback(
        (productId: string) => {
            if (cartId == undefined) {
                return
            }

            addCartLine({ cartId, productId })
        },
        [cartId, addCartLine]
    )

    const addToCartButton = useMemo(() => {
        const defaultButton = (
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
        )

        if (isInCart && addToCartStatus === 'idle') {
            return <button disabled>Already in Cart</button>
        }

        if (!product.availableForSale) {
            return <button disabled>Out of Stock</button>
        }

        if (addToCartStatus === 'pending') {
            return <button disabled>Adding...</button>
        }

        if (addToCartStatus === 'success') {
            return <button disabled>Added!</button>
        }

        switch (cartStatus) {
            case 'error':
                return <button disabled>Add to Cart</button>
            case 'pending':
                return <button disabled>Loading...</button>
            case 'success':
                return defaultButton
            default:
                return defaultButton
        }
    }, [cartStatus, addToCartStatus, addToCart, isInCart, product])

    return (
        <article>
            <h3>{product.title}</h3>
            <p>{toPriceRepr(product.price)}</p>
            {addToCartButton}
        </article>
    )
}

export default ProductsList
