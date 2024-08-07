import { GetCollectionQuery, ProductFilter } from '@/__generated__/storefront/graphql'
import { GET_COLLECTION_MAX_PRICE } from '@/lib/storefrontAPI/queries'
import { useSuspenseQuery } from '@apollo/client/react/hooks'

const useCollectionMaxPrice = (handle: string, limit: number, filters: ProductFilter[]) => {
	const { data, error } = useSuspenseQuery(GET_COLLECTION_MAX_PRICE, {
		variables: { handle, limit, filters },
		fetchPolicy: 'no-cache',
	})

	const collection = (data as GetCollectionQuery).collection
	const fetchedProducts = collection?.products

	const maxPrice = fetchedProducts?.nodes.reduce((previousPrice, currentProduct) => {
		const currentPrice = Number(currentProduct.priceRange.maxVariantPrice.amount)
		if (currentPrice > previousPrice) {
			return currentPrice
		}

		return previousPrice
	}, 0)

	return {
		maxPrice,
		error,
	}
}

export { useCollectionMaxPrice }
