import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import FormSelect from '../FormSelect'
import { useSuspenseQuery } from '@tanstack/react-query'

type Option = {
    value: string
    name: string
}

type FormSelectWithAsyncOptionsProps<T extends FieldValues> = {
    name: Path<T>
    label: string
    form: UseFormReturn<T, any, undefined>
    autoFocus?: boolean
    fetch: () => Promise<Option[]>
}

const FormSelectWithAsyncOptions = <T extends FieldValues>({
    fetch,
    ...props
}: FormSelectWithAsyncOptionsProps<T>) => {
    const { data: options } = useSuspenseQuery<Option[]>({
        queryKey: [props.name],
        queryFn: fetch,
    })

    return (
        <FormSelect {...props}>
            <option value={undefined}>Select a {props.name}</option>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            ))}
        </FormSelect>
    )
}

export default FormSelectWithAsyncOptions
