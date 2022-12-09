import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import prisma from '../../../lib/prisma';
import { GetServerSideProps } from 'next';
import { withAuthSsr } from '../../../lib/withAuth';
import toPriceString from '../../../lib/toPriceString';
import { Order, OrderItemWithProduct, UserInfo } from '../../../types';
import styles from '../../../styles/Account.module.css';
import Head from 'next/head';
import useWindowSize from '../../../hooks/useWindowsize';
import AccountMenu from '../../../components/AccountMenu';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/router';
import AccountLayout from '../../../components/AccountLayout';

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
					return (
						<div key={item.pid}>
							<Image src={item.product.images[0]} alt="product image" layout="responsive" width="100px" height="119px" />
						</div>
					);
				})}
			</div>
		</li>
	);
};

interface OrdersProps {
	firstName: string;
	orders: Order[];
}

const Orders: React.FunctionComponent<OrdersProps> = ({ firstName, orders }) => {
	return (
		<AccountLayout {...{ firstName, pageTitle: 'Orders | Bordz', header: 'Orders' }}>
			{orders.length ? (
				<ul className={styles['order-list']}>
					{orders.map((order: any) => {
						return <OrderComponent order={order} key={order.id} />;
					})}
				</ul>
			) : (
				<p>You haven&apos;t bought anything yet!</p>
			)}
		</AccountLayout>
	);
};

export const getServerSideProps: GetServerSideProps = withAuthSsr(async (context: any) => {
	const user = context.req.session.user;

	const userInfo: UserInfo | null = await prisma.user.findUnique({
		where: { id: user.uid },
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
		},
	});

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
								salePrice: parseInt(item.product.salePrice.toString()),
								createdAt: JSON.stringify(item.product.createdAt),
							},
						};
					}),
				};
			});
		})
		.catch(err => console.log(err));
	//TODO: add price to orderItem because it could be different from the original price

	return {
		props: {
			firstName: userInfo?.firstName,
			orders,
		},
	};
});

export default Orders;
