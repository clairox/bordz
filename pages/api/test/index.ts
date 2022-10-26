import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (!req.session.user) {
		return res.status(403).json(null);
	}

	return res.status(200).json({ data: 'bepis' });
}

export default withIronSessionApiRoute(handler, sessionOptions);
