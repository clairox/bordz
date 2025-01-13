import { Popover, PopoverContent, PopoverTrigger } from '../Popover'
import { Button } from '../Button'
import React, { useState } from 'react'
import { CaretUpDown, Check } from '@phosphor-icons/react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '../Command'
import { useQuery, useQueryClient } from '@tanstack/react-query'

type CustomOptionSelectProps = {
    id: string
    value: string
    placeholder?: string
    disabled?: boolean
    onChange: (value: string) => void
    fetchOptions: () => Promise<FormSelectOption[]>
    addOption: (value: string) => Promise<FormSelectOption>
}

export const CustomOptionSelect = React.forwardRef<
    HTMLDivElement,
    CustomOptionSelectProps
>(
    (
        {
            id,
            value,
            placeholder,
            disabled = false,
            onChange,
            fetchOptions,
            addOption,
        },
        ref
    ) => {
        const [open, setOpen] = useState(false)

        const {
            data: options,
            error,
            isPending: optionsPending,
        } = useQuery<FormSelectOption[]>({
            queryKey: ['options', id],
            queryFn: fetchOptions,
            placeholderData: prev => prev,
        })

        const onOptionSelect = (value: string) => {
            if (!value) {
                return
            }

            onChange(value)
            setOpen(false)
        }

        return (
            <div ref={ref}>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            type="button"
                            variant="outline"
                            role="combobox"
                            disabled={
                                disabled ||
                                !!error ||
                                optionsPending ||
                                !options
                            }
                            aria-expanded={open}
                            className="w-full justify-between"
                        >
                            {value
                                ? options?.find(
                                      option => option.value === value
                                  )?.name
                                : placeholder}
                            <CaretUpDown size={18} weight="light" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        {options && (
                            <SelectContent
                                id={id}
                                selectedValue={value}
                                options={options}
                                addOption={addOption}
                                onSelect={onOptionSelect}
                            />
                        )}
                    </PopoverContent>
                </Popover>
            </div>
        )
    }
)

CustomOptionSelect.displayName = 'CustomOptionSelect'

type SelectContentProps = {
    id: string
    selectedValue: string
    options: FormSelectOption[]
    addOption: (value: string) => Promise<FormSelectOption>
    onSelect: (value: string) => void
}

const SelectContent: React.FC<SelectContentProps> = ({
    id,
    selectedValue,
    options,
    addOption,
    onSelect,
}) => {
    const [searchValue, setSearchValue] = useState('')
    const queryClient = useQueryClient()

    const disabled =
        !searchValue || !!options.find(option => option.name === searchValue)

    const handleAddOption = async (value: string) => {
        const newOption = await addOption(value)
        await queryClient.setQueryData(
            ['options', id],
            (prev: FormSelectOption[]) => prev.concat(newOption)
        )
        onSelect(newOption.value)
    }

    return (
        <Command>
            <div className="flex gap-2">
                <CommandInput
                    value={searchValue}
                    onValueChange={setSearchValue}
                    placeholder="Search..."
                    className="h-9"
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            if (!disabled) {
                                handleAddOption(searchValue)
                            }
                        }
                    }}
                />

                <Button
                    type="button"
                    disabled={disabled}
                    className="w-10"
                    onClick={() => handleAddOption(searchValue)}
                >
                    {`+`}
                </Button>
            </div>
            <CommandList>
                <CommandEmpty>
                    {/* <Button */}
                    {/*     type="button" */}
                    {/*     disabled={!searchValue} */}
                    {/*     className="w-full" */}
                    {/*     onClick={() => handleAddOption(searchValue)} */}
                    {/* > */}
                    {/*     {`Add "${searchValue}"`} */}
                    {/* </Button> */}
                </CommandEmpty>
                <CommandGroup>
                    {options.map(option => (
                        <CommandItem
                            key={option.value}
                            value={option.name}
                            onSelect={() => onSelect(option.value)}
                        >
                            {option.name}
                            {selectedValue === option.value && (
                                <Check size={18} weight="light" />
                            )}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}
