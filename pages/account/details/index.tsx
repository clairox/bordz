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
	const {
		register,
		handleSubmit,
		formState: { isValid, isDirty },
	} = useForm<UserInfo>({ mode: 'onChange' });

	const onSubmit: SubmitHandler<UserInfo> = async data => {
		const { firstName, lastName, email } = data;
		await axios.patch('/api/session-user', { firstName, lastName, email }, { withCredentials: true });
		Router.reload();
	};

	return (
		<div className={styles['container']}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles['header']}>
					<h2>Details</h2>
				</div>
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
