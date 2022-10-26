import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (prisma === undefined) return res.status(500).json(null);
	if (!req.session.user) return res.status(200).json(null);

	if (req.method === 'GET') {
		await prisma.user
			.findUnique({
				where: { id: req.session.user.uid },
			})
			.then(user => {
				if (!user) {
					return res.status(401).json(null);
				}

				return res.status(200).json({ uid: user.id, firstName: user.firstName });
			})
			.catch(() => {
				return res.status(500).json(null);
			});
	} else if (req.method === 'DELETE') {
		await req.session.destroy();
		return res.status(200).json(null);
	} else {
		return res.status(405).json(null);
	}
}

export default withIronSessionApiRoute(handler, sessionOptions);
