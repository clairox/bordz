import prisma from '../../../../lib/prisma';
import { compare } from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../../lib/session';
import { SessionUser } from '../../../../types';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (prisma === undefined) return res.status(500).json(null);
	if (req.method !== 'POST') return res.status(405).json(null);

	const { email, password } = req.body;

	await prisma.user
		.findUnique({
			where: { email },
		})
		.then(user => {
			if (!user) {
				return res.status(404).json(null);
			}

			compare(password, user.passwordHash, async (err, isValid) => {
				if (err) {
					return res.status(500).json(null);
				}

				if (!isValid) {
					return res.status(401).json(null);
				}

				req.session.user = { isLoggedIn: true, uid: user.id } as SessionUser;
				await req.session.save();
				return res.status(200).json({ uid: user.id, firstName: user.firstName });
			});
		})
		.catch(() => {
			return res.status(500).json(null);
		});
}

export default withIronSessionApiRoute(handler, sessionOptions);
