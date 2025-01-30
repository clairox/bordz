'use client'

import { useState } from 'react'

import {
    AlertDialog,
    AlertDialogContent,
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
                <DeleteAccountDialogForm setOpen={value => setOpen(value)} />
            </AlertDialogContent>
        </AlertDialog>
    )
}
