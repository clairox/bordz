import prisma from '../../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../../lib/session';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2022-08-01',
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (prisma === undefined) return res.status(500).json(null);
	if (!req.session.user) return res.status(401).json(null);

	if (req.method === 'POST') {
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

		if (!items) return res.status(500).json(null);

		const orderNum = Math.floor(Math.random() * 10000000);

		const { domain } = req.body;

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card', 'afterpay_clearpay'],
			mode: 'payment',
			locale: 'en',
			line_items: items.map((item: any) => {
				return {
					price_data: {
						currency: 'usd',
						product_data: {
							name: item.product.name,
						},
						unit_amount: item.product.salePrice,
					},
					quantity: item.quantity,
				};
			}),
			shipping_address_collection: { allowed_countries: ['US', 'GB', 'CA', 'AU', 'NZ'] },
			billing_address_collection: 'required',
			success_url: `http://${domain}/success?orderId=${orderNum}&session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `http://${domain}/`,
		});

		//TODO: change urls to domain name
		return res.status(200).json({ url: session.url });
	} else {
		return res.status(405).json(null);
	}
}

export default withIronSessionApiRoute(handler, sessionOptions);
