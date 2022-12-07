import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';
import { Product, ShoppingCartItem } from '@prisma/client';

type ShoppingCartItemWithProduct = ShoppingCartItem & { product: Product };

const calculateOrderAmount = (items: ShoppingCartItemWithProduct[]) => {
	let total = items.reduce((prev: number, item: ShoppingCartItemWithProduct) => {
		return parseInt(item.product.salePrice.toString()) * item.quantity + prev;
	}, 0);
	return total;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (prisma === undefined) return res.status(500).json(null);
	if (!req.session.user) return res.status(401).json(null);

	if (req.method === 'POST') {
		const { id } = req.body;
		const idAsInt = parseInt(id);

		const existingOrder = await prisma.order.findUnique({
			where: { id: idAsInt },
		});

		if (existingOrder) {
			return res.status(200).json({ createdOrder: false });
		}

		const items = await prisma.shoppingCart
			.findUnique({
				where: { uid: req.session.user.uid },
				select: {
					items: {
						include: {
							product: true,
						},
					},
				},
			})
			.then(cart => {
				return cart?.items;
			});

		if (!items) {
			return res.status(500).json(null);
		}

		const order = await prisma.order
			.create({
				data: {
					id: idAsInt,
					uid: req.session.user.uid,
					total: calculateOrderAmount(items),
				},
			})
			.then(order => order);

		await prisma.$transaction(
			items.map((item: ShoppingCartItemWithProduct) => {
				return prisma.orderItem.create({
					data: {
						pid: item.pid,
						orderId: order.id,
						quantity: item.quantity,
					},
				});
			})
		);

		return res.status(200).json({ createdOrder: true });
	} else {
		return res.status(405).json(null);
	}
}

export default withIronSessionApiRoute(handler, sessionOptions);
