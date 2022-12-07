import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import useWindowSize from '../hooks/useWindowsize';
import AccountMenu from './AccountMenu';
import styles from '../styles/Account.module.css';
import Head from 'next/head';

interface AccountLayoutProps {
	firstName: string;
	pageTitle: string;
	header: string;
	children: React.ReactNode;
}

const AccountLayout: React.FunctionComponent<AccountLayoutProps> = ({ firstName, pageTitle, header, children }) => {
	const router = useRouter();

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
				<title>{pageTitle}</title>
			</Head>
			{isWide && (
				<div className={styles['sidebar']}>
					<AccountMenu firstName={firstName} />
				</div>
			)}
			<div className={styles['content']}>
				<div className={styles['header']}>
					<div className={styles['back']} onClick={() => router.push('/account')}>
						<BiArrowBack />
					</div>
					<h2>{header}</h2>
				</div>
				{children}
			</div>
		</div>
	);
};

export default AccountLayout;
