'use client'

import { useMemo, useState } from 'react'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'

import { cn } from '@/utils/helpers'
import { useSupabase } from '@/context/SupabaseContext'

type FormFileUploadProps<T extends FieldValues> = {
    name: Path<T>
    label: string
    accept: string
    uploadBucket: string
    uploadPath?: string
    form: UseFormReturn<T, any, undefined>
}

const FormFileUpload = <T extends FieldValues>({
    name,
    label,
    accept,
    uploadBucket,
    uploadPath = '',
    form,
}: FormFileUploadProps<T>) => {
    const supabase = useSupabase()

    const [file, setFile] = useState<File | undefined>(undefined)
    const [fileUploaded, setFileUploaded] = useState(false)

    const errors = useMemo(() => form.formState.errors, [form.formState.errors])

    const handleUpload = async () => {
        if (!file) {
            return
        }

        const path = uploadPath + '/' + file.name
        const { data, error } = await supabase.storage
            .from(uploadBucket)
            .upload(path, file)

        if (error) {
            console.error(error)

            setFileUploaded(false)
        } else {
            form.setValue(name, data.path as PathValue<T, Path<T>>)

            setFileUploaded(true)
        }
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <label htmlFor={name} className="text-black">
                {label}
            </label>
            <input
                type="file"
                id={name}
                accept={accept}
                onChange={e => {
                    setFileUploaded(false)
                    form.resetField(name)

                    setFile(e.target.files?.[0])
                }}
                className={cn(
                    'border focus:outline-none focus:ring-2',
                    errors[name]
                        ? 'border-red-500 focus:ring-red-300'
                        : 'border-black'
                )}
            />
            {errors[name] && (
                <p className="text-red-500">{errors[name].message as string}</p>
            )}
            <button
                disabled={!file || errors[name] != undefined}
                type="button"
                onClick={handleUpload}
            >
                {fileUploaded ? 'Uploaded!' : 'Upload'}
            </button>
        </div>
    )
}

export default FormFileUpload
