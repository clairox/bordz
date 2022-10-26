import React from 'react';
import { GetServerSideProps } from 'next';
import prisma from '../../lib/prisma';
import { withAuthSsr } from '../../lib/withAuth';
import styles from '../../styles/Account.module.css';
import Router from 'next/router';
import { useAuth } from '../../context/authContext';

interface AccountPageProps {
	firstName: string;
}

const AccountPage: React.FunctionComponent<AccountPageProps> = ({ firstName }) => {
	const { logout } = useAuth();
	return (
		<div className={styles['main-container']}>
			<div className={styles['header']}>
				<h2>Hey, {firstName}!</h2>
			</div>
			<div className={styles['layout']}>
				<div>
					<ul className={styles['menu']}>
						<li className={styles['menu-option']} onClick={() => Router.push('/account/details')}>
							<p>Account Details</p>
						</li>
						<li className={styles['menu-option']} onClick={() => Router.push('/account/orders')}>
							<p>Orders</p>
						</li>
						<li className={styles['menu-option']} onClick={() => Router.push('/account/change-password')}>
							<p>Change Password</p>
						</li>
						<li
							className={styles['menu-option']}
							onClick={async () => {
								await logout!();
								Router.reload();
							}}
						>
							<p>Logout</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = withAuthSsr(async (context: any) => {
	const user = context.req.session.user;

	const userInfo = await prisma.user.findUnique({
		where: { id: user.uid },
		select: {
			firstName: true,
		},
	});

	return {
		props: {
			firstName: userInfo?.firstName,
		},
	};
});

export default AccountPage;
