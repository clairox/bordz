import { Session } from '@supabase/supabase-js'
import * as jose from 'jose'

const getUserRole = (session: Session): string => {
    const { user_role } = jose.decodeJwt(session!.access_token)
    if (!user_role) {
        throw new Error('User does not have role.')
    }
    return user_role as string
}

export default getUserRole
