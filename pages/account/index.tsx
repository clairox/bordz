import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import prisma from '../../lib/prisma';
import { withAuthSsr } from '../../lib/withAuth';
import styles from '../../styles/Account.module.css';
import Head from 'next/head';
import AccountMenu from '../../components/AccountMenu';
import useWindowSize from '../../hooks/useWindowsize';
interface AccountPageProps {
	firstName: string;
}

const AccountPage: React.FunctionComponent<AccountPageProps> = ({ firstName }) => {
	const { windowSize } = useWindowSize();
	const [isWide, setIsWide] = useState(true);

	useEffect(() => {
		if (!windowSize.width) {
			return;
		}

		setIsWide(windowSize.width >= 700);
	}, [windowSize]);

	return (
		<div className={styles['container']}>
			<Head>
				<title>Account | Bordz</title>
			</Head>
			<div className={styles['sidebar']}>
				<AccountMenu firstName={firstName} />
			</div>
			{isWide && (
				<div className={styles['content']}>
					<h1>Your Account</h1>
				</div>
			)}
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
