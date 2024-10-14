import { redirect } from 'next/navigation'
import { Fragment } from 'react'

type RedirectIfProps = React.PropsWithChildren<{
    condition: boolean
    url: string
}>

const RedirectIf: React.FC<RedirectIfProps> = ({
    condition,
    url,
    children,
}) => {
    if (condition === true) {
        return redirect(url)
    }

    return <Fragment>{children}</Fragment>
}

export default RedirectIf
