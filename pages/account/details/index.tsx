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

	const {
		register,
		handleSubmit,
		formState: { isValid, isDirty },
	} = useForm<UserInfo>({ mode: 'onChange' });

	const onSubmit: SubmitHandler<UserInfo> = async data => {
		const { firstName, lastName, email } = data;
		await axios.patch('/api/session-user', { firstName, lastName, email }, { withCredentials: true });
		router.reload();
	};

	const { windowSize } = useWindowSize();
	const [isWide, setIsWide] = useState(true);

	useEffect(() => {
		if (!windowSize.width) {
			return;
		}

		setIsWide(windowSize.width >= 700);
	}, [windowSize]);

	return (
		<AccountLayout {...{ firstName: userInfo.firstName, pageTitle: 'Account Details | Bordz', header: 'Details' }}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles['input-group']}>
					<label>First Name</label>
					<input type="text" defaultValue={userInfo.firstName} {...register('firstName', { required: true, shouldUnregister: true })} />
				</div>
				<div className={styles['input-group']}>
					<label>Last Name</label>
					<input type="text" defaultValue={userInfo.lastName} {...register('lastName', { required: true, shouldUnregister: true })} />
				</div>
				<div className={styles['input-group']}>
					<label>Email Address</label>
					<input type="email" defaultValue={userInfo.email} {...register('email', { required: true, shouldUnregister: true })} />
				</div>
				<input type="submit" value="Save Changes" disabled={!isValid || !isDirty} />
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
