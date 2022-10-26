import React from 'react';
import prisma from '../../../lib/prisma';
import { GetServerSideProps } from 'next';
import { withAuthSsr } from '../../../lib/withAuth';
import { UserInfo } from '../../../types';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Router from 'next/router';
import styles from '../../../styles/Account.module.css';

interface DetailsProps {
	userInfo: UserInfo;
}

const Details: React.FunctionComponent<DetailsProps> = ({ userInfo }) => {
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
		Router.reload();
	};

	return (
		<div className={styles['container']}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles['header']}>
					<h2>Change Password</h2>
				</div>
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
		</div>
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
