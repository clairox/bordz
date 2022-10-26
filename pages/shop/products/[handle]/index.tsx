import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react';
import ProductDetails from '../../../../components/ProductDetails';
import ProductGallery from '../../../../components/ProductGallery';
import { useCart } from '../../../../context/cartContext';
import prisma from '../../../../lib/prisma';
import { Product } from '../../../../types';

//TODO: make products/ send to custom 404
type ProductProps = {
	product: Product;
};

const Product: React.FunctionComponent<ProductProps> = ({ product }) => {
	const { images, ...rest } = product;
	const { addToCart } = useCart();

	const handleAddToCart = (quantity: number) => {
		addToCart!(product.id, quantity);
	};

	const productDetailsProps = {
		...rest,
		handleAddToCart,
	};

	return (
		<div>
			<ProductGallery images={images} />
			<ProductDetails {...productDetailsProps} />
		</div>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const products = await prisma.product
		.findMany({
			select: { handle: true },
		})
		.then(results => {
			return results.map(r => r.handle);
		});

	const paths = products.map(handle => ({ params: { handle } }));
	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
	const { handle } = context.params!;

	if (typeof handle !== 'string') {
		return {
			props: {},
		};
	}

	let product: Product | null = await prisma.product
		.findUnique({
			where: { handle },
			select: {
				id: true,
				name: true,
				handle: true,
				price: true,
				images: true,
				description: true,
				details: true,
				quantity: true,
				brandName: true,
				categoryName: true,
			},
		})
		.then(p => {
			if (p) {
				return {
					id: p.id,
					name: p.name,
					handle: p.handle,
					price: parseInt(p.price.toString()),
					images: p.images,
					description: p.description,
					details: p.details,
					quantity: p.quantity,
					brand: p.brandName,
					category: p.categoryName,
				};
			}
			return p;
		});
	return {
		props: { product },
	};
};
export default Product;
