import React, { useEffect, useState } from 'react';
import { useCart } from '../context/cartContext';
import toPriceString from '../lib/toPriceString';
import styles from '../styles/Cart.module.css';
import ciStyles from '../styles/CartItem.module.css';
import axios from 'axios';
import Router from 'next/router';
import { CgClose } from 'react-icons/cg';
import Image from 'next/image';
import CounterInput from './CounterInput';
import { CartItem } from '../types';

type CartProps = {
	closeDrawer: (e: any) => void;
};

const Cart: React.FunctionComponent<CartProps> = ({ closeDrawer }) => {
	const { cart, deleteFromCart, incrementItemQuantity, decrementItemQuantity, setItemQuantity } = useCart();
	const total = cart?.reduce((p, c) => p + c.linePrice, 0);

	return (
		<>
			<div className={styles['header']}>
				<span className={styles['close']} onClick={e => closeDrawer(e)}>
					<CgClose />
				</span>
				<h2 className={styles['title']}>My Cart</h2>
			</div>
			{cart && cart.length ? (
				<section className={styles['content']}>
					<ul>
						{cart?.map(item => {
							return (
								<li key={item.pid}>
									<CartItem
										cartItem={item}
										deleteFromCart={deleteFromCart}
										incrementQuantity={incrementItemQuantity}
										decrementQuantity={decrementItemQuantity}
										setQuantity={setItemQuantity}
									/>
								</li>
							);
						})}
					</ul>
					<div>
						<h3 className={styles['subtotal']} style={{ float: 'right', margin: 0, marginRight: '5px' }}>
							subtotal: {toPriceString(total || 0)}
						</h3>
					</div>
					<div className={styles['checkout-button']}>
						<button
							onClick={e => {
								axios
									.post('/api/checkout-session/new', { domain: window.location.host })
									.then(res => Router.push(res.data.url))
									.catch(err => {
										if (err.response.status === 401) {
											Router.push('/register');
											closeDrawer(e);
										}
									});
							}}
							disabled={cart?.length === 0}
						>
							Checkout
						</button>
					</div>
				</section>
			) : (
				<p style={{ textAlign: 'center' }}>Your cart is empty!</p>
			)}
		</>
	);
};

type CartItemProps = {
	cartItem: CartItem;
	deleteFromCart?: (pid: number) => void;
	incrementQuantity?: (pid: number) => void;
	decrementQuantity?: (pid: number) => void;
	setQuantity?: (pid: number, quantity: number) => Promise<number>;
};

const CartItem: React.FunctionComponent<CartItemProps> = props => {
	const { cartItem, deleteFromCart, decrementQuantity, incrementQuantity } = props;
	const { pid, name, price, salePrice, images, quantityInStock } = cartItem;
	const useSalePrice = price != salePrice;

	const [quantity, setQuantity] = useState<number | string>(cartItem.quantityInCart);

	const min = 1;
	const max = quantityInStock;

	const setCartQuantity = async (value: number | string) => {
		setQuantity(await props.setQuantity!(pid, +value));
	};

	const handleDecrement = () => {
		if (+quantity - 1 < 0) {
			return deleteFromCart!(pid);
		}
		decrementQuantity!(pid);
	};
	const handleIncrement = () => {
		if (+quantity + 1 > max) {
			return;
		}
		incrementQuantity!(pid);
	};

	const handleCounterBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (quantity === '') {
			return setCartQuantity(min);
		}

		if (quantity <= 0) {
			return deleteFromCart!(pid);
		}

		setCartQuantity(Math.min(+quantity, max));
	};

	const handleCounterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === '') {
			return setQuantity(e.target.value);
		}

		const v = +e.target.value;

		if (isNaN(v)) {
			return;
		}

		setQuantity(v);
	};

	useEffect(() => {
		setQuantity(cartItem.quantityInCart);
	}, [cartItem.quantityInCart]);

	return (
		<div className={ciStyles['container']}>
			<div className={ciStyles['image']}>
				<Image src={images[0]} alt="display image" width="100px" height="119px" />
			</div>
			<div className={ciStyles['content']}>
				<div className={ciStyles['name-container']}>
					<span className={ciStyles['name']}>{name}</span>
					<span className={ciStyles['delete']} onClick={() => deleteFromCart!(pid)}>
						<CgClose />
					</span>
				</div>
				<div className={ciStyles['price-quantity']}>
					<div className={ciStyles['quantity-counter-container']}>
						<CounterInput
							value={quantity}
							maxValue={quantityInStock}
							decrement={handleDecrement}
							increment={handleIncrement}
							setValue={setQuantity}
							onBlur={handleCounterBlur}
							onChange={handleCounterChange}
						/>
					</div>
					<span className={`${ciStyles['price-container']}`}>
						{useSalePrice && <span className={`${ciStyles['original-price']} ${ciStyles['line-through']}`}>{toPriceString(price)}</span>}
						<span className={`${ciStyles['price']} ${useSalePrice ? ciStyles['sale-price'] : ''}`}>{toPriceString(salePrice)}</span>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Cart;
