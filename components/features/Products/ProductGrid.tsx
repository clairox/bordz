'use client'

import Link from 'next/link'

import { useCart, useAddCartLineMutation } from '@/hooks/data/cart'
import PriceRepr from '@/components/common/PriceRepr'
import { WishlistToggleButton } from '@/components/features/Wishlist'
import { AddToCartButton } from '@/components/features/Cart'
import { BoardDetailsPopover } from './BoardDetailsPopover'
import StoredPreviewImage from '@/components/common/StoredPreviewImage'
import GridFiller from '@/components/common/GridFiller'

type ProductGridProps = {
    products: Product[]
    columnCount: number
}

const gridColsClasses: Record<number, string> = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
}

export const ProductGrid: React.FC<ProductGridProps> = ({
    products,
    columnCount = 4,
}) => {
    const { data: cart } = useCart()

    return (
        <div
            className={`grid ${gridColsClasses[columnCount]} gap-[1px] w-full bg-gray-400`}
        >
            {products.map((product, idx) => {
                const cartLineId = cart?.lines.find(
                    line => line.product.id === product.id
                )?.id

                return (
                    <ProductCard
                        product={product}
                        cartLineId={cartLineId}
                        key={product.id + idx}
                    />
                )
            })}
            <GridFiller
                itemCount={products.length}
                gridTrackSize={columnCount}
            />
        </div>
    )
}

type ProductCardProps = {
    product: Product
    cartLineId?: string
}

const ProductCard: React.FC<ProductCardProps> = ({ product, cartLineId }) => {
    const { mutate: addCartLine, status: addCartLineStatus } =
        useAddCartLineMutation()

    return (
        <article className="flex flex-col gap-2 bg-white">
            <div className="border-b border-gray-400">
                <StoredPreviewImage
                    path={product.featuredImage}
                    alt="product image"
                />
            </div>
            <div className="px-6 pt-2 pb-5">
                <div className="flex justify-between mb-4">
                    <h3>{product.title}</h3>
                    {product.productType === 'BOARD' && (
                        <BoardDetailsPopover productId={product.id} />
                    )}
                </div>
                <div className="flex justify-between">
                    <p>
                        <PriceRepr value={product.price} />
                    </p>
                    {product.productType === 'BOARD' && (
                        <Link
                            href={`/lab?mode=customize&id=${product.id}`}
                            className="text-sm hover:underline"
                        >
                            Customize
                        </Link>
                    )}
                </div>
                <div className="flex justify-between">
                    <AddToCartButton
                        isInCart={!!cartLineId}
                        addCartLineStatus={addCartLineStatus}
                        isInStock={product.availableForSale}
                        onClick={() => addCartLine({ productId: product.id })}
                    />
                    <WishlistToggleButton productId={product.id} />
                </div>
            </div>
        </article>
    )
}
