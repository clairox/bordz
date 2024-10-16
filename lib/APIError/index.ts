class APIError extends Error {
    status: number
    code: string
    field: string | undefined

    constructor(status: number, message: string, code: string, field?: string) {
        super(message)

        this.status = status
        this.code = code
        this.field = field
    }
}

export default APIError
