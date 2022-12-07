import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useCart } from '../../context/cartContext';
import Head from 'next/head';

const SuccessPage: React.FunctionComponent = () => {
	const { orderId } = useRouter().query;
	const { clearCart, cartState } = useCart();

	const [creatingOrder, setCreatingOrder] = useState(false);

	useEffect(() => {
		if (orderId && !creatingOrder && cartState === 'succeeded') {
			setCreatingOrder(true);
			axios.post(`/api/orders`, { id: orderId }, { withCredentials: true }).then(res => {
				if (res.data.createdOrder) {
					clearCart!();
				}
			});
		}
	}, [orderId, creatingOrder, clearCart, cartState]);

	return (
		<div style={{ width: '100%' }}>
			<Head>
				<title>Success | Bordz</title>
			</Head>
			<h2>Your order has been placed!</h2>
			<p>
				Your order number is <span>#{orderId}</span>
			</p>
		</div>
	);
};

export default SuccessPage;
