import React, { useState } from 'react';
import toPriceString from '../lib/toPriceString';
import styles from '../styles/ProductDetails.module.css';
import { FaRegHeart, FaHeart, FaTruck, FaClock } from 'react-icons/fa';
import CounterInput from './CounterInput';

type ProductDetailsProps = {
	name: string;
	price: number;
	quantity: number;
	description: string;
	details: string[];
	handleAddToCart: (quantity: number) => void;
};

const ProductDetails: React.FunctionComponent<ProductDetailsProps> = props => {
	const { name, price, description, details, handleAddToCart } = props;
	const [quantity, setQuantity] = useState<number | string>(1);
	const [isInWishlist, setIsInWishlist] = useState<boolean>(false);

	//TODO: do something else if not in stock
	return (
		<section>
			<div className={styles['container']}>
				<h2 className={styles['header']}>{name}</h2>
				<p className={styles['price']}>{toPriceString(price)}</p>
				<div className={styles['quantity']}>
					<p>Select Quantity</p>
					<CounterInput value={quantity} setValue={setQuantity} minValue={1} maxValue={props.quantity} />
				</div>
				<div className={styles['add-container']}>
					<div className={styles['add-to-cart-container']} onClick={() => handleAddToCart(+quantity)}>
						<button>Add To Cart</button>
					</div>
					<div
						className={`${styles['add-to-wishlist-container']} ${isInWishlist && styles['is-in-wishlist']}`}
						onClick={() => setIsInWishlist(!isInWishlist)}
					>
						{isInWishlist ? <FaHeart /> : <FaRegHeart />}
					</div>
				</div>
				<div className={styles['shipping-container']}>
					<p>
						<span className={styles['shipping-icon']}>
							<FaTruck />
						</span>
						<span className={styles['shipping-info']}>Free Standard Shipping On Orders Over $70</span>
					</p>
					<p>
						<span className={styles['shipping-icon']}>
							<FaClock />
						</span>
						<span className={styles['shipping-info']}>5-7 Business Days</span>
					</p>
				</div>
				<div className={styles['description']}>
					<p className={styles['description-content']}>{description}</p>
				</div>
				<div className={styles['details']}>
					<h3 className={styles['details-header']}>Product Details</h3>
					<ul className={styles['details-content']}>
						{details.map((d, idx) => {
							return <li key={idx}>{d}</li>;
						})}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default ProductDetails;
