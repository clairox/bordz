type FormMessageProps = {
    message: string
    type?: FormMessageType
}

const FormMessage: React.FC<FormMessageProps> = ({
    message,
    type = 'error',
}) => {
    return <p>{message}</p>
}

export default FormMessage
