import { Item as RadioGroupItem } from '@radix-ui/react-radio-group'

type FormRadioGroupItem = React.ComponentPropsWithoutRef<
    typeof RadioGroupItem
> & { label: React.ReactNode }
