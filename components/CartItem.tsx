import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import toPriceString from '../lib/toPriceString';
import styles from '../styles/CartItem.module.css';
import { CartItem } from '../types';
import CounterInput from './CounterInput';
import { CgClose } from 'react-icons/cg';

type CartItemProps = {
	cartItem: CartItem;
	deleteFromCart?: (pid: number) => void;
	incrementQuantity?: (pid: number) => void;
	decrementQuantity?: (pid: number) => void;
	setQuantity?: (pid: number, quantity: number) => Promise<number>;
};

//TODO: link cartItem to product page maybe
const CartItem: React.FunctionComponent<CartItemProps> = props => {
	const { cartItem, deleteFromCart, decrementQuantity, incrementQuantity } = props;
	const { pid, name, price, images, quantityInStock } = cartItem;

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

	//TODO: disable add to cart after pressing, until updated cart is returned
	//TODO: open cart drawer when updated cart is returned
	return (
		<div className={styles['container']}>
			<div className={styles['image']}>
				<Image src={images[0]} alt="display image" width="100px" height="119px" />
			</div>
			<div className={styles['content']}>
				<div className={styles['name-container']}>
					<span className={styles['name']}>{name}</span>
					<span className={styles['delete']} onClick={() => deleteFromCart!(pid)}>
						<CgClose />
					</span>
				</div>
				<div className={styles['price-quantity']}>
					<div className={styles['quantity-counter-container']}>
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
					<span className={styles['price']}>{toPriceString(price)}</span>
				</div>
			</div>

			{/*<span className={styles.delete} onClick={() => deleteFromCart!(pid)} style={{ fontSize: '2rem', fontWeight: 'bold' }}>
				x
			</span>
			<h4>{name}</h4>
			<h3>{toPriceString(price || 0)}</h3>
			<div className={styles.quantityCounterContainer}>
				<button className={styles.quantityDecrement} onClick={() => decrementQuantity!(pid)}>
					-
				</button>
				<input type="text" value={quantity} className={styles.quantityCounter} readOnly />
				<button className={styles.quantityIncrement} onClick={() => incrementQuantity!(pid)}>
					+
				</button>
	</div>*/}
		</div>
	);
};

export default CartItem;
