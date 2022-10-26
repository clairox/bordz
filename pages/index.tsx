import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Bordz</title>
				<meta name="description" content="bordz" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<Link href="/shop/new" passHref>
					<a>
						<Image src="/promo1.png" alt="promo" layout="responsive" width="800" height="700" />
					</a>
				</Link>
			</div>
			<div className={styles['grid']}>
				<div className={styles['grid-item']}>
					<Link href="/shop/decks" passHref>
						<a>
							<Image src="/decks.png" alt="promo" layout="responsive" width="525" height="700" />
						</a>
					</Link>
				</div>
				<div className={styles['grid-item']}>
					<Link href="/shop/wheels" passHref>
						<a>
							<Image src="/wheels.png" alt="promo" layout="responsive" width="525" height="700" />
						</a>
					</Link>
				</div>
				<div className={styles['grid-item']}>
					<Link href="/shop/trucks" passHref>
						<a>
							<Image src="/trucks.png" alt="promo" layout="responsive" width="525" height="700" />
						</a>
					</Link>
				</div>
				<div className={styles['grid-item']}>
					<Link href="/shop/griptape" passHref>
						<a>
							<Image src="/griptape.png" alt="promo" layout="responsive" width="525" height="700" />
						</a>
					</Link>
				</div>
				<div className={styles['grid-item']}>
					<Link href="/shop/bearings" passHref>
						<a>
							<Image src="/bearings.png" alt="promo" layout="responsive" width="525" height="700" />
						</a>
					</Link>
				</div>
				<div className={styles['grid-item']}>
					<Link href="/shop/hardware" passHref>
						<a>
							<Image src="/hardware.png" alt="promo" layout="responsive" width="525" height="700" />
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;
