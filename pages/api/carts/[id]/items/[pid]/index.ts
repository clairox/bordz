import prisma from '../../../../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (prisma === undefined) return res.status(500).json(null);

	if (req.method === 'PATCH') {
		const { id: cartId, pid: pid } = req.query as { [key: string]: string };
		const body = req.body;
		const oldItem = await prisma.shoppingCartItem
			.findUnique({
				where: {
					pid_cartId: {
						pid: parseInt(pid),
						cartId: parseInt(cartId),
					},
				},
				include: {
					product: {
						select: {
							price: true,
						},
					},
				},
			})
			.then(item => item)
			.catch(err => {});

		if (!oldItem) {
			return res.status(404).json(null);
		}

		const updateData = {
			pid: body.product_id || oldItem.pid,
			cartId: body.cartId || oldItem.cartId,
			quantity: body.quantity.increment
				? { increment: body.quantity.increment }
				: body.quantity.decrement
				? { decrement: body.quantity.decrement }
				: body.quantity || oldItem.quantity,
			linePrice: body.quantity.increment
				? { increment: body.quantity.increment * parseInt(oldItem.product.price.toString()) }
				: body.quantity.decrement
				? { decrement: body.quantity.decrement * parseInt(oldItem.product.price.toString()) }
				: body.quantity
				? body.quantity * parseInt(oldItem.product.price.toString())
				: oldItem.linePrice,
		};

		await prisma.shoppingCartItem
			.update({
				where: {
					pid_cartId: {
						pid: parseInt(pid),
						cartId: parseInt(cartId),
					},
				},
				data: updateData,
				select: {
					pid: true,
					quantity: true,
					linePrice: true,
					cartId: true,
					createdAt: true,
					product: {
						select: {
							images: true,
							name: true,
							price: true,
							quantity: true,
						},
					},
				},
			})
			.then(item => {
				const { product, ...rest } = item;
				return res.status(200).json({
					...rest,
					linePrice: parseInt(item.linePrice.toString()),
					product: {
						...product,
						price: parseInt(product.price.toString()),
					},
				});
			})
			.catch(err => {
				res.status(500).json(null);
			});
	} else if (req.method === 'DELETE') {
		const { id: cartId, pid: pid } = req.query as { [key: string]: string };

		await prisma.shoppingCartItem
			.delete({
				where: {
					pid_cartId: {
						pid: parseInt(pid),
						cartId: parseInt(cartId),
					},
				},
			})
			.then(() => res.status(204).json(null))
			.catch(err => {
				res.status(500).json(null);
			});
	} else {
		return res.status(405).json(null);
	}
}

export default handler;
