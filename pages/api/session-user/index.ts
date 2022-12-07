import prisma from '../../../lib/prisma';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '../../../lib/session';

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
	} else if (req.method === 'DELETE') {
		await prisma.user
			.delete({
				where: { id: req.session.user.uid },
			})
			.then(() => {
				return res.status(204).json(null);
			})
			.catch(err => {
				console.log(err);
				return res.status(500).json(null);
			});
	} else {
		return res.status(405).json(null);
	}
}

export default withIronSessionApiRoute(handler, sessionOptions);
