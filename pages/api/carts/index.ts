import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';
import { Product, ShoppingCartItem } from '@prisma/client';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (prisma === undefined) return res.status(500).json(null);

	if (req.method === 'GET') {
		const { uid, populated } = req.query as { [key: string]: string };

		await prisma.shoppingCart
			.findFirst({
				where: { uid: parseInt(uid) },
				include:
					populated === 'true'
						? {
								items: {
									orderBy: { createdAt: 'desc' },
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
												salePrice: true,
												quantity: true,
											},
										},
									},
								},
						  }
						: { items: false },
			})
			.then(data => {
				if (!data) {
					return res.status(200).json({});
				}

				const { id, uid, total } = data;

				interface CartResults {
					id: number;
					uid: number;
					total: number;
					items?: { [key: string]: any }[];
				}

				const cart: CartResults = {
					id,
					uid,
					total: parseInt(total.toString()),
				};

				interface ShoppingCartItemWithProduct extends ShoppingCartItem {
					product?: Product;
				}

				if (populated === 'true') {
					cart.items = data.items.map((item: ShoppingCartItemWithProduct) => {
						const { product, ...rest } = item;
						return {
							...rest,
							linePrice: parseInt(item.linePrice.toString()),
							product: {
								...product,
								price: parseInt(product!.price.toString()),
								salePrice: parseInt(product!.salePrice.toString()),
							},
						};
					});
				}
				return res.status(200).json(cart);
			})
			.catch(err => {
				console.error(err);
				return res.status(500).json(null);
			});
	} else {
		return res.status(405).json(null);
	}
}

export default withIronSessionApiRoute(handler, sessionOptions);
