import { serialize } from 'cookie'
import { NextResponse } from 'next/server'

export const POST = async () => {
	const cookie = serialize('customerAccessToken', '', {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		maxAge: -1,
		sameSite: 'strict',
		path: '/',
	})

	const response = NextResponse.json({ success: true })
	response.headers.append('Set-Cookie', cookie)
	response.headers.append('Access-Control-Allow-Origin', '*')
	return response
}
