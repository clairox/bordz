import { useState } from 'react'

const useFormMessage = () => {
    const [message, setMessage] = useState<string | undefined>(undefined)
    const [type, setType] = useState<FormMessageType>('error')

    const showMessage = (msg: string, msgType: FormMessageType = 'error') => {
        setMessage(msg)
        setType(msgType)
    }

    const clearMessage = () => {
        setMessage(undefined)
        setType('error')
    }

    return { message, type, showMessage, clearMessage }
}

export default useFormMessage
