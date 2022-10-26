import React from 'react';
import Navbar from './Navbar';
import styles from '../styles/Layout.module.css';

type Props = {
	children: React.ReactNode;
};

const Layout: React.FunctionComponent<Props> = ({ children }) => {
	return (
		<div id="main-layout" className={`${styles['container']}`}>
			<div>
				<Navbar />
				<div className={styles['promotion']}>
					<p>Free Standard Shipping On Orders Over $70</p>
				</div>
				<main className={'content'}>{children}</main>
			</div>
			<footer className={styles['footer']}></footer>
		</div>
	);
};

export default Layout;
