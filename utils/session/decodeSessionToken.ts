import * as jose from 'jose'

export const decodeSessionToken = (sessionToken: string) => {
    return jose.decodeJwt(sessionToken)
}
