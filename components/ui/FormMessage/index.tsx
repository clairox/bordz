type FormMessageProps = {
    message: string
    type?: FormMessageType
}

const FormMessage: React.FC<FormMessageProps> = ({
    message,
    type = 'error',
}) => {
    const backgroundClass = {
        error: 'border border-red-400 bg-red-200',
        success: 'border border-green-400 bg-green-200',
    }
    return (
        <div
            className={`flex justify-start items-center p-6 w-full min-h-[50px] rounded-sm ${backgroundClass[type]}`}
        >
            {message}
        </div>
    )
}

export default FormMessage
