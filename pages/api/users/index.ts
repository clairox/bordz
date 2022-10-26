import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';
import { hash } from 'bcrypt';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (prisma === undefined) return res.status(500).json(null);

	if (req.method === 'POST') {
		const { firstName, lastName, email, password } = req.body;

		const userWithGivenEmail = await prisma.user
			.findUnique({
				where: { email },
			})
			.then(user => {
				return user;
			})
			.catch(() => {
				return null;
			});

		if (userWithGivenEmail) {
			return res.status(409).json(null);
		}

		hash(password, 12, async (err, hash) => {
			if (err || !hash) {
				return res.status(500).json(null);
			}

			await prisma.user
				.create({
					data: {
						firstName,
						lastName,
						email,
						passwordHash: hash,
						cart: {
							create: {},
						},
					},
				})
				.then(() => res.status(200).json(null))
				.catch(() => res.status(500).json(null));

			return;
		});
	} else {
		return res.status(405).json(null);
	}
}

export default withIronSessionApiRoute(handler, sessionOptions);
