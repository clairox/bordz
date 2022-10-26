import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (prisma === undefined) return res.status(500).json(null);
	if (!req.session.user) return res.status(405).json(null);

	if (req.method === 'DELETE') {
		const { cartId } = req.query as { [key: string]: string };

		await prisma.shoppingCartItem.deleteMany({
			where: { cartId: parseInt(cartId) },
		});

		return res.status(204).json(null);
	} else {
		return res.status(405).json(null);
	}
}

export default withIronSessionApiRoute(handler, sessionOptions);
