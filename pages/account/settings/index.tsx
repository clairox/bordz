import axios from 'axios';
import { GetServerSideProps } from 'next';
import Router, { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CgClose } from 'react-icons/cg';
import Overlay from '../../../components/Overlay';
import { useAuth } from '../../../context/authContext';
import { useCart } from '../../../context/cartContext';
import useModal from '../../../hooks/useModal';
import { withAuthSsr } from '../../../lib/withAuth';
import styles from '../../../styles/Account.module.css';
import mStyles from '../../../styles/Modal.module.css';
import prisma from '../../../lib/prisma';
import Head from 'next/head';
import useWindowSize from '../../../hooks/useWindowsize';
import AccountMenu from '../../../components/AccountMenu';
import { UserInfo } from '../../../types';
import { BiArrowBack } from 'react-icons/bi';
import AccountLayout from '../../../components/AccountLayout';

interface SettingsProps {
	firstName: string;
}

const Settings: React.FunctionComponent<SettingsProps> = ({ firstName }) => {
	const router = useRouter();

	const { openModal, closeModal, isOpen, Modal } = useModal();

	const { register, handleSubmit } = useForm<{ password: string }>({
		mode: 'onChange',
		reValidateMode: 'onSubmit',
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	});
	const [customError, setCustomError] = useState<{ message?: string } | null>(null);

	const { logout } = useAuth();
	const { clearCart } = useCart();

	const onSubmit: SubmitHandler<{ password: string }> = async data => {
		if (!logout || !clearCart) return;

		setCustomError(null);
		const { status, error } = await axios
			.post('/api/confirm-password', { password: data.password }, { withCredentials: true })
			.then(res => {
				return {
					status: res.status,
					error: {},
				};
			})
			.catch(err => {
				return {
					status: err.response.status,
					error: {
						message: 'Incorrect password',
					},
				};
			});

		if (status === 200) {
			await axios
				.delete('/api/session-user', { withCredentials: true })
				.then(async res => {
					if (res.status === 204) {
						await clearCart();
						await logout();
						router.push('/');
					}
				})
				.catch(() => {});
		} else {
			setCustomError(error);
		}
	};

	return (
		<AccountLayout {...{ firstName, pageTitle: 'Settings | Bordz', header: 'Settings' }}>
			<button
				onClick={e => {
					openModal(e);
				}}
			>
				Delete Account
			</button>
			{isOpen && (
				<>
					<Overlay />
					<Modal>
						<div>
							<div className={mStyles['close']}>
								<span
									onClick={e => {
										setCustomError(null);
										closeModal(e);
									}}
								>
									<CgClose />
								</span>
							</div>
							<form className={styles['delete-modal-content']} onSubmit={handleSubmit(onSubmit)}>
								<p className={styles['warning']}>You are about to delete your account. This cannot be undone.</p>
								<ul className={styles['error-messages']}>
									{customError && <li className={styles['error-message']}>{customError.message}</li>}
								</ul>

								<p>Please enter your password to confirm:</p>
								<input type="password" {...register('password', { required: true, shouldUnregister: true })} />
							</form>
						</div>
					</Modal>
				</>
			)}
		</AccountLayout>
	);
};

export const getServerSideProps: GetServerSideProps = withAuthSsr(async (context: any) => {
	const user = context.req.session.user;

	const userInfo: UserInfo | null = await prisma.user.findUnique({
		where: { id: user.uid },
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
		},
	});

	return {
		props: {
			firstName: userInfo?.firstName,
		},
	};
});

export default Settings;
