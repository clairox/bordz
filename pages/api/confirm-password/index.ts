import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';
import { compareSync } from 'bcrypt';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (prisma === undefined) return res.status(500).json(null);
	if (!req.session.user) return res.status(401).json(null);

	if (req.method === 'POST') {
		const { password } = req.body;

		const user = await prisma.user
			.findUnique({
				where: { id: req.session.user.uid },
			})
			.then(user => {
				return user;
			})
			.catch(() => {
				return null;
			});

		if (!user) {
			return res.status(404).json(null);
		}

		if (compareSync(password, user.passwordHash)) {
			return res.status(200).json(null);
		} else {
			return res.status(401).json(null);
		}
	} else {
		return res.status(405).json(null);
	}
}

export default withIronSessionApiRoute(handler, sessionOptions);
