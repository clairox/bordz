import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useCart } from '../context/cartContext';
import styles from '../styles/Navbar.module.css';
import SearchBar from './SearchBar';
import { BiSearch, BiUser, BiCart, BiMenu } from 'react-icons/bi';
import Image from 'next/image';
import useModal from '../hooks/useModal';
import { RegisterModalWrapper } from './RegisterForm';
import { LoginModalWrapper } from './LoginForm';
import useDrawer from '../hooks/useDrawer';
import Cart from './Cart';
import SideMenu from './SideMenu';
import Overlay from './Overlay';

const Navbar: React.FunctionComponent = () => {
	const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
	const { user, logout } = useAuth();
	const { cartSize } = useCart();

	const { openModal: openRegModal, closeModal: closeRegModal, isOpen: isRegModalOpen, Modal: RegModal } = useModal();
	const { openModal: openLogModal, closeModal: closeLogModal, isOpen: isLogModalOpen, Modal: LogModal } = useModal();

	const {
		openDrawer: openCartDrawer,
		closeDrawer: closeCartDrawer,
		isOpen: isCartDrawerOpen,
		Drawer: CartDrawer,
	} = useDrawer({ id: 'cart-drawer', fullScreen: true, side: 'right', closeOnEsc: false });
	const {
		openDrawer: openMenuDrawer,
		closeDrawer: closeMenuDrawer,
		isOpen: isMenuDrawerOpen,
		Drawer: MenuDrawer,
	} = useDrawer({ id: 'menu-drawer', side: 'left', closeOnEsc: false });

	return (
		<nav id={styles['navbar']}>
			<div className={styles['nav-layout']}>
				<div className={styles['nav-left']}>
					<div className={styles['nav-actions-item']} onClick={e => openMenuDrawer(e)}>
						<BiMenu />
					</div>
					<Link href={`/`}>
						<a>
							<div className={styles['nav-brand']}>
								<Image src="/bordz-brand-black.svg" alt="bordz logo" width="102px" height="35px" />
							</div>
						</a>
					</Link>
				</div>
				{/*user ? (
				<div
					id={styles['login-icon'] + ' ' + styles['nav-actions-item']}
					onClick={async () => {
						await logout!();
						//TODO: if private route push to homepage
						Router.reload();
					}}
				>
					<p>LOGOUT</p>
				</div>
			) : (
				<div
					id={styles['login-icon']}
					onClick={e => {
						openRegModal(e);
					}}
				>
					<p>SIGN UP</p>
				</div>
				)*/}
				{/*<div id={styles['nav-right']}>
				<Link href={`/shop/new`}>
					<a>
						<div className={styles['nav-item']}>NEW</div>
					</a>
				</Link>
	</div>*/}
				<div className={styles['nav-right']}>
					{/*<div id={styles.searchBar}>
					<SearchBar />
	</div>*/}
					<div className={styles['nav-actions-item']} onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}>
						<BiSearch />
					</div>
					<div className={styles['nav-actions-item']}>
						{user ? (
							<Link href={`/account`}>
								<a>
									<BiUser />
								</a>
							</Link>
						) : (
							<div onClick={e => openRegModal(e)}>
								<BiUser />
							</div>
						)}
					</div>
					<div className={styles['cart-icon']} onClick={e => openCartDrawer(e)}>
						<div className={styles['nav-actions-item']}>
							<BiCart />
							{cartSize && cartSize > 0 ? <span className={styles['cart-size']}>{cartSize}</span> : <></>}
						</div>
					</div>
				</div>
			</div>
			{isSearchBarOpen && (
				<div className={styles['mobile-search']}>
					<SearchBar setIsSearchBarOpen={setIsSearchBarOpen} />
				</div>
			)}
			{isRegModalOpen && (
				<>
					<Overlay />
					<RegModal>
						<RegisterModalWrapper
							switchToLogin={async (e: any) => {
								closeRegModal(e);
								openLogModal(e);
							}}
							closeModal={closeRegModal}
						/>
					</RegModal>
				</>
			)}
			{isLogModalOpen && (
				<>
					<Overlay />
					<LogModal>
						<LoginModalWrapper
							switchToRegister={(e: any) => {
								closeLogModal(e);
								openRegModal(e);
							}}
							closeModal={closeLogModal}
						/>
					</LogModal>
				</>
			)}
			{isMenuDrawerOpen && <Overlay />}
			<MenuDrawer>
				<SideMenu closeDrawer={closeMenuDrawer} isDrawerOpen={isMenuDrawerOpen} openRegModal={openRegModal} />
			</MenuDrawer>
			{isCartDrawerOpen && <Overlay />}
			<CartDrawer>
				<Cart closeDrawer={closeCartDrawer} />
			</CartDrawer>
		</nav>
	);
};

export default Navbar;
