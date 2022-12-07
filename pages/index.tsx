import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Skateboard Equipment & More | Bordz</title>
				<meta name="description" content="bordz" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<Link href="/shop/new?brand=12" passHref>
					<a>
						<Image src="/promo2.png" alt="promo" layout="responsive" width="1600" height="1200" />
					</a>
				</Link>
			</div>
			<div>
				<Link href="/shop/new" passHref>
					<a>
						<Image src="/promo1.png" alt="promo" layout="responsive" width="1600" height="1400" />
					</a>
				</Link>
			</div>
			<div className={styles['grid']}>
				<div className={styles['grid-item']}>
					<Link href="/shop/decks" passHref>
						<a>
							<div className={styles['frame']}>
								<Image src="/decks.jpeg" alt="skateboard deck" layout="responsive" width="1060" height="1260" />
								<p>Decks</p>
							</div>
						</a>
					</Link>
				</div>
				<div className={styles['grid-item']}>
					<Link href="/shop/wheels" passHref>
						<a>
							<div className={styles['frame']}>
								<Image src="/wheels.jpeg" alt="skateboard wheel" layout="responsive" width="1060" height="1260" />
								<p>Wheels</p>
							</div>
						</a>
					</Link>
				</div>
				<div className={styles['grid-item']}>
					<Link href="/shop/trucks" passHref>
						<a>
							<div className={styles['frame']}>
								<Image src="/trucks.jpeg" alt="skateboard truck" layout="responsive" width="1060" height="1260" />
								<p>Trucks</p>
							</div>
						</a>
					</Link>
				</div>
				<div className={styles['grid-item']}>
					<Link href="/shop/griptape" passHref>
						<a>
							<div className={styles['frame']}>
								<Image src="/griptape.jpeg" alt="skateboard griptape" layout="responsive" width="1060" height="1260" />
								<p>Griptape</p>
							</div>
						</a>
					</Link>
				</div>
				<div className={styles['grid-item']}>
					<Link href="/shop/bearings" passHref>
						<a>
							<div className={styles['frame']}>
								<Image src="/bearings.jpeg" alt="skateboard bearings" layout="responsive" width="1060" height="1260" />
								<p>Bearings</p>
							</div>
						</a>
					</Link>
				</div>
				<div className={styles['grid-item']}>
					<Link href="/shop/hardware" passHref>
						<a>
							<div className={styles['frame']}>
								<Image src="/hardware.jpeg" alt="skateboard hardware" layout="responsive" width="1060" height="1260" />
								<p>Hardware</p>
							</div>
						</a>
					</Link>
				</div>
				{/* <div className={styles['grid-item']}>
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
				</div> */}
			</div>
		</div>
	);
};

export default Home;
