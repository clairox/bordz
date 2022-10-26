import { IronSessionOptions } from 'iron-session';
import { SessionUser } from '../types';

const TOKEN_NAME = 'SESSIONID';

export const sessionOptions: IronSessionOptions = {
	password: process.env.SESSION_TOKEN_SECRET as string,
	cookieName: TOKEN_NAME,
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
	},
};

declare module 'iron-session' {
	interface IronSessionData {
		user?: SessionUser;
	}
}
