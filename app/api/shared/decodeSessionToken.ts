import jwt, { JwtPayload } from 'jsonwebtoken'

const decodeSessionToken = (token: string) => {
    if (!process.env.SUPABASE_JWT_SECRET) {
        throw new Error('SUPABASE_JWT_SECRET is not defined')
    }

    const { sub, exp, user_metadata } = jwt.verify(
        token,
        process.env.SUPABASE_JWT_SECRET
    ) as JwtPayload

    if (!sub || !exp || !user_metadata) {
        throw new Error('Invalid token')
    }

    return { sub, exp, user_metadata }
}

export default decodeSessionToken
