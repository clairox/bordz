'use client'

import { useState } from 'react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import { DeleteAccountDialogForm } from '@/components/forms/DeleteAccountDialogForm'

export const DeleteAccountDialogButton = () => {
    const [open, setOpen] = useState(false)

    return (
        <AlertDialog open={open}>
            <AlertDialogTrigger asChild onClick={() => setOpen(true)}>
                <Button>Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <DeleteAccountDialogForm
                    open={open}
                    setOpen={value => setOpen(value)}
                />
            </AlertDialogContent>
        </AlertDialog>
    )
}
