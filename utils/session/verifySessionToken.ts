import * as jose from 'jose'

export const verifySessionToken = async (token: string) => {
    const secret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET!)
    return await jose.jwtVerify(token, secret)
}
