import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import React, { useState, useEffect } from 'react';
import dStyles from '../../../../styles/ProductDetails.module.css';
import gStyles from '../../../../styles/ProductGallery.module.css';
import { useCart } from '../../../../context/cartContext';
import prisma from '../../../../lib/prisma';
import { Product } from '../../../../types';
import CounterInput from '../../../../components/CounterInput';
import { FaCheck, FaClock, FaHeart, FaRegHeart, FaTruck } from 'react-icons/fa';
import toPriceString from '../../../../lib/toPriceString';
import Image from 'next/image';
import Head from 'next/head';
import styles from '../../../../styles/Product.module.css';
import useWindowSize from '../../../../hooks/useWindowsize';
import ErrorPage from '../../../../components/ErrorPage';

type ProductProps = {
	product: Product;
};

const Product: React.FunctionComponent<ProductProps> = ({ product }) => {
	const { images, ...rest } = product;
	const { addToCart } = useCart();

	if (!product) {
		return <ErrorPage statusCode={404} />;
	}

	const handleAddToCart = async (quantity: number) => {
		return await addToCart!(product.id, quantity)
			.then(result => result)
			.catch(err => {
				throw err;
			});
	};

	const productDetailsProps = {
		...rest,
		handleAddToCart,
	};

	return (
		<div className={styles['container']}>
			<Head>
				<title>{`${product.name} | Bordz`}</title>
			</Head>
			<ProductGallery images={images} />
			<ProductDetails {...productDetailsProps} />
		</div>
	);
};

type ProductDetailsProps = {
	name: string;
	price: number;
	salePrice: number;
	quantity: number;
	description: string;
	details: string[];
	handleAddToCart: (quantity: number) => Promise<boolean>;
};

const ProductDetails: React.FunctionComponent<ProductDetailsProps> = props => {
	const { name, price, salePrice, description, details, handleAddToCart } = props;
	const useSalePrice = price != salePrice;
	const [quantity, setQuantity] = useState<number | string>(1);
	const [isInWishlist, setIsInWishlist] = useState(false);

	const [isAdding, setIsAdding] = useState(false);
	const [isAdded, setIsAdded] = useState(false);

	//TODO: do something else if not in stock
	return (
		<section className={dStyles['details-container']}>
			<div className={dStyles['container']}>
				<h2 className={dStyles['header']}>{name}</h2>
				<div className={`${dStyles['price-container']}`}>
					{useSalePrice && <span className={`${dStyles['original-price']} ${dStyles['line-through']}`}>{toPriceString(price)}</span>}
					<span className={`${dStyles['price']} ${useSalePrice ? dStyles['sale-price'] : ''}`}>{toPriceString(salePrice)}</span>
				</div>
				<div className={dStyles['quantity']}>
					<p>Select Quantity</p>
					<CounterInput value={quantity} setValue={setQuantity} minValue={1} maxValue={props.quantity} />
				</div>
				<div className={dStyles['add-container']}>
					<div className={dStyles['add-to-cart-container']}>
						<button
							aria-label="Add To Cart"
							className={isAdding || isAdded ? dStyles['adding'] : ''}
							disabled={isAdding || isAdded}
							onClick={async () => {
								setIsAdding(true);
								await handleAddToCart(+quantity);
								setIsAdding(false);
								setIsAdded(true);
								setTimeout(() => {
									setIsAdded(false);
								}, 1500);
							}}
						>
							<span>
								{isAdding ? (
									<div style={{ position: 'relative', bottom: '6px' }}>
										<Image src="/spinner.svg" alt="spinner" width="30px" height="30px" />
									</div>
								) : isAdded ? (
									<div className={dStyles['check']}>
										<FaCheck />
									</div>
								) : (
									'Add to Cart'
								)}
							</span>
						</button>
					</div>
					<div
						className={`${dStyles['add-to-wishlist-container']} ${isInWishlist && dStyles['is-in-wishlist']}`}
						onClick={() => setIsInWishlist(!isInWishlist)}
					>
						{isInWishlist ? <FaHeart /> : <FaRegHeart />}
					</div>
				</div>
				<div className={dStyles['shipping-container']}>
					<p>
						<span className={dStyles['shipping-icon']}>
							<FaTruck />
						</span>
						<span className={dStyles['shipping-info']}>Free Standard Shipping On Orders Over $70</span>
					</p>
					<p>
						<span className={dStyles['shipping-icon']}>
							<FaClock />
						</span>
						<span className={dStyles['shipping-info']}>5-7 Business Days</span>
					</p>
				</div>
				<div className={dStyles['description']}>
					<p className={dStyles['description-content']}>{description}</p>
				</div>
				<div className={dStyles['details']}>
					<h3 className={dStyles['details-header']}>Product Details</h3>
					<ul className={dStyles['details-content']}>
						{details.map((d, idx) => {
							return <li key={idx}>{d}</li>;
						})}
					</ul>
				</div>
			</div>
		</section>
	);
};

type ProductGalleryProps = {
	images: string[];
};

const ProductGallery: React.FunctionComponent<ProductGalleryProps> = ({ images }) => {
	const [isWideScreen, setIsWideScreen] = useState(false);
	const [mainImage, setMainImage] = useState(images[0]);

	const { windowSize } = useWindowSize();

	useEffect(() => {
		if (!windowSize.width) {
			return;
		}

		setIsWideScreen(windowSize.width >= 1024);
	}, [windowSize.width]);

	return (
		<section className={gStyles['gallery-container']}>
			{isWideScreen ? (
				<div className={gStyles['gallery-full']}>
					<div className={gStyles['images']}>
						{images.map((img, idx) => {
							return (
								<div className={gStyles['image']} key={idx} onClick={() => setMainImage(img)}>
									<Image src={img} alt="product image" width="103px" height="122px" />
								</div>
							);
						})}
					</div>
					<div className={gStyles['image-main']}>
						<Image src={mainImage} alt="product image" width="720px" height="856px" />
					</div>
				</div>
			) : (
				<>
					<div className={gStyles['gallery-slider']}>
						{images.map((img, idx) => {
							return (
								<div key={idx} className={gStyles['gallery-slider-image']}>
									<Image src={img} alt="product image" width="720px" height="856px" />
								</div>
							);
						})}
					</div>
				</>
			)}
		</section>
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
				salePrice: true,
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
					salePrice: parseInt(p.salePrice.toString()),
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
