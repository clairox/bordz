// import prisma from '../../../../lib/prisma';
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { withIronSessionApiRoute } from 'iron-session/next';
// import { sessionOptions } from '../../../../lib/session';

// async function handler(req: NextApiRequest, res: NextApiResponse) {
// 	if (prisma === undefined) return res.status(500).json(null);

// 	if (req.method === 'GET') {
// 		const { uid } = req.query as { [key: string]: string}
// 		await prisma.user.findUnique({
// 			where: { id: uid }
// 		})
// 	} else {
// 		return res.status(405).json(null);
// 	}
// }

// export default withIronSessionApiRoute(handler, sessionOptions);
