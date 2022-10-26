import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from './session';

const withAuth = (gssp: any) => {
	return async (context: any) => {
		const { req } = context;
		const user = req.session.user;

		if (!user) {
			return {
				redirect: {
					destination: '/login?redirect=true',
					statusCode: 302,
				},
			};
		}

		return await gssp(context);
	};
};

export const withAuthSsr = (handler: any) => withIronSessionSsr(withAuth(handler), sessionOptions);
