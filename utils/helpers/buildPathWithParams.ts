import buildParamString from './buildParamString'

const buildPathWithParams = (
    pathname: string,
    params?: Record<string, unknown>
) => {
    let fullPath = pathname
    if (params) {
        fullPath += buildParamString(params)
    }
    return fullPath
}

export default buildPathWithParams
