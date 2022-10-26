import prisma from '../../../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../../../lib/session';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (prisma === undefined) return res.status(500).json(null);

	if (req.method === 'PUT') {
		const { id: cartId } = req.query as { [key: string]: string };

		interface RequestCartItem {
			pid: number;
			quantity: number;
			linePrice: number;
		}
		if (req.body.items) {
			const { items } = req.body as { [key: string]: any };

			await prisma
				.$transaction(
					items.map((item: RequestCartItem) => {
						const { pid, quantity, linePrice } = item;
						return prisma.shoppingCartItem.upsert({
							where: {
								pid_cartId: {
									pid,
									cartId: parseInt(cartId),
								},
							},
							update: {
								quantity: {
									increment: quantity,
								},
								linePrice: {
									increment: linePrice,
								},
							},
							create: {
								pid,
								quantity,
								linePrice,
								cartId: parseInt(cartId),
							},
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
						});
					})
				)
				.then(items => {
					return res.status(200).json(
						items.map(item => {
							const { product, ...rest } = item;
							return {
								...rest,
								linePrice: parseInt(item.linePrice.toString()),
								product: {
									...product,
									price: parseInt(product.price.toString()),
								},
							};
						})
					);
				})
				.catch(err => {
					return res.status(500).json(null);
				});
		} else {
			const { product, quantity } = req.body;
			const { id, price } = product;

			await prisma.shoppingCartItem
				.upsert({
					where: {
						pid_cartId: {
							pid: id,
							cartId: parseInt(cartId),
						},
					},
					update: {
						quantity: {
							increment: quantity,
						},
						linePrice: {
							increment: price * quantity,
						},
					},
					create: {
						pid: id,
						cartId: parseInt(cartId),
						quantity,
						linePrice: price * quantity,
					},
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
					return res.status(500).json(null);
				});
		}
	} else if (req.method === 'DELETE') {
		const { id: cartId } = req.query as { [key: string]: string };
		const { pid } = req.body;

		await prisma.shoppingCartItem
			.delete({
				where: {
					pid_cartId: {
						pid,
						cartId: parseInt(cartId),
					},
				},
			})
			.then(() => res.status(204).json(null))
			.catch(() => res.status(500).json(null));
	} else {
		return res.status(405).json(null);
	}
}

export default withIronSessionApiRoute(handler, sessionOptions);
