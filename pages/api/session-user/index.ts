import prisma from '../../../lib/prisma';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '../../../lib/session';
import { hashSync } from 'bcrypt';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (prisma === undefined) return res.status(500).json(null);
	if (!req.session.user) return res.status(200).json(null);

	if (req.method === 'PATCH') {
		const { firstName, lastName, email } = req.body;

		await prisma.user
			.update({
				where: { id: req.session.user.uid },
				data: {
					firstName,
					lastName,
					email,
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
