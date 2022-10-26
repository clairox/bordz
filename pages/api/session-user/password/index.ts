import prisma from '../../../../lib/prisma';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '../../../../lib/session';
import { hashSync, compareSync } from 'bcrypt';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (prisma === undefined) return res.status(500).json(null);
	if (!req.session.user) return res.status(200).json(null);

	if (req.method === 'PATCH') {
		const { currentPassword, newPassword } = req.body;

		const user = await prisma.user.findUnique({
			where: { id: req.session.user.uid },
		});
		const isPasswordCorrect = user ? compareSync(currentPassword, user?.passwordHash) : false;

		if (!isPasswordCorrect) {
			return res.status(405).json(null);
		}

		let passwordHash;
		if (newPassword) {
			passwordHash = hashSync(newPassword, 12);
		}

		await prisma.user
			.update({
				where: { id: req.session.user.uid },
				data: {
					passwordHash,
				},
			})
			.then(user => {
				return res.status(200).json(user);
			});
	} else {
		return res.status(405).json(null);
	}
}

export default withIronSessionApiRoute(handler, sessionOptions);
