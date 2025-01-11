import { FormLabel } from '../Form'

type FormLabelWithIndicatorProps = React.PropsWithChildren<{
    required: boolean
}>

export const FormLabelWithIndicator: React.FC<FormLabelWithIndicatorProps> = ({
    children,
    required,
}) => {
    return <FormLabel>{`${children}${required ? ' *' : ''}`}</FormLabel>
}
