import type { IronSessionOptions } from 'iron-session';
import { SessionUser } from '../types';

const TOKEN_NAME = 'SESSIONID';
const MAX_AGE = 60 * 60 * 100;

export const sessionOptions: IronSessionOptions = {
	cookieName: TOKEN_NAME,
	password: process.env.SESSION_TOKEN_SECRET as string,
	cookieOptions: {
		maxAge: MAX_AGE,
		expires: new Date(Date.now() + MAX_AGE * 1000),
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		sameSite: 'lax',
	},
};

declare module 'iron-session' {
	interface IronSessionData {
		user?: SessionUser;
	}
}
