import React, { useState, useEffect } from 'react';
import prisma from '../../../lib/prisma';
import { GetServerSideProps } from 'next';
import { withAuthSsr } from '../../../lib/withAuth';
import { UserInfo } from '../../../types';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import styles from '../../../styles/Account.module.css';
import Head from 'next/head';
import useWindowSize from '../../../hooks/useWindowsize';
import AccountMenu from '../../../components/AccountMenu';
import { BiArrowBack } from 'react-icons/bi';
import AccountLayout from '../../../components/AccountLayout';

interface DetailsProps {
	userInfo: UserInfo;
}

const Details: React.FunctionComponent<DetailsProps> = ({ userInfo }) => {
	const router = useRouter();

	interface PW {
		currentPassword: string;
		newPassword: string;
	}
	const {
		register,
		handleSubmit,
		formState: { isValid },
	} = useForm<PW>({ mode: 'onChange' });

	const onSubmit: SubmitHandler<PW> = async data => {
		const { currentPassword, newPassword } = data;
		await axios.patch('/api/session-user/password', { currentPassword, newPassword }, { withCredentials: true });
		router.reload();
	};

	return (
		<AccountLayout {...{ firstName: userInfo.firstName, pageTitle: 'Change Password | Bordz', header: 'Change Password' }}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles['input-group']}>
					<label>Current Password</label>
					<input type="password" {...register('currentPassword', { required: true, shouldUnregister: true })} />
				</div>
				<div className={styles['input-group']}>
					<label>New Password</label>
					<input type="password" {...register('newPassword', { required: true, minLength: 8, shouldUnregister: true })} />
				</div>
				<input type="submit" value="Save Changes" disabled={!isValid} />
			</form>
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
			userInfo,
		},
	};
});

export default Details;
