'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormErrorBox from '@/components/UI/FormResponseBox/FormErrorBox'
import PasswordInput from '@/components/UI/PasswordInput'
import { Button } from '@/components/UI/Button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/UI/Form'
import DeleteAccountFormSchema from './schema'
import { usePathname, useRouter } from 'next/navigation'
import { login, logout } from '@/lib/auth'
import { useAccountContext } from '@/context/AccountContext/AccountContext'
import { fetcher } from '@/lib/fetcher'
import { FetcherError } from '@/lib/fetcher/fetcher'

type FormData = z.infer<typeof DeleteAccountFormSchema>

const DeleteAccountForm = () => {
	const { customer } = useAccountContext()

	const router = useRouter()
	const pathname = usePathname()

	const form = useForm<FormData>({
		resolver: zodResolver(DeleteAccountFormSchema),
		defaultValues: {
			confirmPassword: '',
		},
	})
	const errors = form.formState.errors

	const [formErrorMessage, setFormErrorMessage] = useState('')

	const isPasswordCorrect = async (password: string): Promise<boolean> => {
		const { success } = await login(customer.email, password)
		return success
	}

	const onSubmit = async (data: FormData) => {
		setFormErrorMessage('')

		const isCorrectPassword = await isPasswordCorrect(data.confirmPassword)
		if (!isCorrectPassword) {
			return setFormErrorMessage('Password is incorrect.')
		}

		try {
			await fetcher('/customer', {
				method: 'DELETE',
				cache: 'no-cache',
			})

			const { success } = await logout()
			if (success) {
				window.location.href = '/'
			}
		} catch (error) {
			if (error instanceof FetcherError) {
				if (error.response.status === 401) {
					const url = '/login?redirect=' + encodeURIComponent(pathname) + '&reason=session_expired'
					return router.push(url)
				} else {
					setFormErrorMessage(error.response.data.message)
				}
			} else {
				throw new Error('Something went wrong')
			}
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full max-w-[350px] space-y-4"
				noValidate
			>
				<p>
					You are about to delete your account. Please enter your password and click the
					&quot;Delete Account&quot; button to confirm your choice
				</p>
				<div className="w-full space-y-3">
					{formErrorMessage && <FormErrorBox>{formErrorMessage}</FormErrorBox>}
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-black">Confirm Password</FormLabel>
								<FormControl>
									<PasswordInput
										className={`${errors.confirmPassword && 'border-red-500 text-red-500'}`}
										{...field}
									/>
								</FormControl>
								{errors.confirmPassword && (
									<p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
								)}
							</FormItem>
						)}
					/>
				</div>
				<Button variant={'destructive'} type="submit">
					Delete Account
				</Button>
			</form>
		</Form>
	)
}

export default DeleteAccountForm
