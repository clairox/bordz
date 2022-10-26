import Image from 'next/image';
import React from 'react';
import prisma from '../../../lib/prisma';
import { GetServerSideProps } from 'next';
import { withAuthSsr } from '../../../lib/withAuth';
import toPriceString from '../../../lib/toPriceString';
import { Order, OrderItemWithProduct } from '../../../types';
import styles from '../../../styles/Account.module.css';

interface OrderComponentProps {
	order: Order;
}

const OrderComponent: React.FunctionComponent<OrderComponentProps> = ({ order }) => {
	return (
		<li className={styles['order-list-item']}>
			<div>
				<div className={styles['order-header']}>
					<p>{new Date(JSON.parse(order.createdAt)).toDateString()}</p>
					<p>{`#${order.id}`}</p>
				</div>
				<div className={styles['order-price']}>
					<p>Price: </p>
					<p>{toPriceString(order.total)}</p>
				</div>
			</div>
			<div className={styles['image-row']}>
				{order.orderItems.slice(0, 3).map((item: OrderItemWithProduct) => {
					return <Image key={item.pid} src={item.product.images[0]} alt="product image" width="100px" height="119px" />;
				})}
			</div>
		</li>
	);
};

interface OrdersProps {
	orders: Order[];
}

const Orders: React.FunctionComponent<OrdersProps> = ({ orders }) => {
	return (
		<div className={styles['container']}>
			<div className={styles['header']}>
				<h2>Orders</h2>
			</div>
			<ul className={styles['order-list']}>
				{orders.map((order: any) => {
					return <OrderComponent order={order} key={order.id} />;
				})}
			</ul>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = withAuthSsr(async (context: any) => {
	const user = context.req.session.user;

	const orders = await prisma.order
		.findMany({
			where: { uid: user.uid },
			orderBy: { createdAt: 'desc' },
			include: {
				orderItems: {
					include: {
						product: true,
					},
				},
			},
		})
		.then(orders => {
			return orders.map((order: any) => {
				return {
					...order,
					id: parseInt(order.id.toString()),
					total: parseInt(order.total.toString()),
					createdAt: JSON.stringify(order.createdAt),
					orderItems: order.orderItems.map((item: any) => {
						return {
							...item,
							orderId: parseInt(item.orderId.toString()),
							createdAt: JSON.stringify(item.createdAt),
							product: {
								...item.product,
								price: parseInt(item.product.price.toString()),
								createdAt: JSON.stringify(item.product.createdAt),
							},
						};
					}),
				};
			});
		})
		.catch(() => {});

	return {
		props: {
			orders,
		},
	};
});

export default Orders;
