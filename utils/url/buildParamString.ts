export const buildParamString = (params: Record<string, unknown>) => {
    const paramsArray: string[] = []
    Object.keys(params).forEach(key => {
        const value = params[key]
        if (value != undefined) {
            paramsArray.push(`${key}=${value}`)
        }
    })

    return paramsArray.length ? '?' + paramsArray.join('&') : ''
}
