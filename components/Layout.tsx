import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import styles from '../styles/Layout.module.css';
import Promo from './Promo';
import { useRouter } from 'next/router';
import LoadingOverlay from './LoadingOverlay';
import Overlay from './Overlay';

type Props = {
	children: React.ReactNode;
};

const Layout: React.FunctionComponent<Props> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [shouldOverlayContent, setShouldOverlayContent] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const onRouteChangeStart = (destination: string) => {
			if (router.asPath === destination) {
				return;
			}
			if (router.asPath.slice(0, 8) === '/account' && destination.slice(0, 8) === '/account') {
				return;
			}

			setIsLoading(true);
		};

		const onRouteChangeComplete = () => setIsLoading(false);
		if (router.events) {
			router.events.on('routeChangeStart', onRouteChangeStart);
			router.events.on('routeChangeComplete', onRouteChangeComplete);
		}
		return () => {
			router.events.off('routeChangeStart', onRouteChangeStart);
			router.events.off('routeChangeComplete', onRouteChangeComplete);
		};
	}, [router.asPath, router.events]);

	return (
		<div id="main-layout" className={`${styles['container']}`}>
			{isLoading && <LoadingOverlay />}
			{shouldOverlayContent && <Overlay />}
			<div>
				<Navbar setShouldOverlayContent={setShouldOverlayContent} />
				<Promo />
				<main className={'content'}>{children}</main>
			</div>
			<footer className={styles['footer']}>
				<div>COPYRIGHT &copy; 2022 BORDZ</div>
				<div className={styles['footer-links']}>
					<a>Terms & Conditions</a>
					<a>Privacy Policy</a>
				</div>
			</footer>
		</div>
	);
};

export default Layout;
