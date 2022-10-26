import React from 'react';
import { useCart } from '../context/cartContext';
import toPriceString from '../lib/toPriceString';
import CartItem from './CartItem';
import styles from '../styles/Cart.module.css';
import axios from 'axios';
import Router from 'next/router';
import { CgClose } from 'react-icons/cg';

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
					<h3 style={{ float: 'right', margin: 0, marginRight: '5px' }}>subtotal: {toPriceString(total || 0)}</h3>
				</div>
				<div className={styles['checkout-button']}>
					<button
						onClick={() => {
							axios.post('/api/checkout-session/new').then(res => Router.push(res.data.url));
						}}
						disabled={cart?.length === 0}
					>
						Checkout
					</button>
				</div>
			</section>
		</>
	);
};

//TODO: make disabled button styles

export default Cart;
