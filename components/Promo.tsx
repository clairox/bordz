import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from '../styles/Promo.module.css';

const Promo = () => {
	const [promoStrings, setPromoStrings] = useState([
		{
			string: 'Free Standard Shipping On Orders Over $70',
			url: '/shop/new',
		},
		{
			string: '20% Off On All DGK Products',
			url: '/shop/new?brand=12',
		},
	]);

	useEffect(() => {
		setTimeout(() => {
			setPromoStrings(promoStrings.slice(1).concat(promoStrings[0]));
		}, 3000);
	}, [promoStrings]);
	return (
		<div className={styles['container']}>
			<div className={styles['content']}>
				<Link href={promoStrings[0].url} passHref>
					<a>
						<p>{promoStrings[0].string}</p>
					</a>
				</Link>
			</div>
		</div>
	);
};

export default Promo;
