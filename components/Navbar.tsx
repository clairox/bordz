import Link from 'next/link';
import React, { Dispatch, SetStateAction, MutableRefObject, useState, useEffect, useRef } from 'react';
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
import useWindowSize from '../hooks/useWindowsize';
import { FaRegHeart } from 'react-icons/fa';
import Router, { useRouter } from 'next/router';

interface NavbarProps {
	setShouldOverlayContent: Dispatch<SetStateAction<boolean>>;
}

const Navbar: React.FunctionComponent<NavbarProps> = ({ setShouldOverlayContent }) => {
	const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
	const { user } = useAuth();
	const { cartSize } = useCart();

	const { openModal: openRegModal, closeModal: closeRegModal, isOpen: isRegModalOpen, Modal: RegModal } = useModal();
	const { openModal: openLogModal, closeModal: closeLogModal, isOpen: isLogModalOpen, Modal: LogModal } = useModal();

	const {
		openDrawer: openCartDrawer,
		closeDrawer: closeCartDrawer,
		isOpen: isCartDrawerOpen,
		setFullScreen: setCartDrawerFullScreen,
		Drawer: CartDrawer,
	} = useDrawer({ id: 'cart-drawer', fullScreen: true, side: 'right', closeOnEsc: false });
	const {
		openDrawer: openMenuDrawer,
		closeDrawer: closeMenuDrawer,
		isOpen: isMenuDrawerOpen,
		setHidden: setMenuDrawerHidden,
		Drawer: MenuDrawer,
	} = useDrawer({ id: 'menu-drawer', side: 'left', closeOnEsc: false });

	const { windowSize } = useWindowSize();

	const [canFitSearchBar, setCanFitSearchBar] = useState(false);
	const [canFitMenu, setCanFitMenu] = useState(false);
	const [isBrandLogoWhite, setIsBrandLogoWhite] = useState(false);

	useEffect(() => {
		if (!windowSize.width) {
			return;
		}

		const { width } = windowSize;

		setCartDrawerFullScreen(width <= 600);
		setCanFitSearchBar(width >= 768);
		setIsBrandLogoWhite(width >= 768);
		setCanFitMenu(width >= 1024);
		setMenuDrawerHidden(width >= 1024);
	}, [windowSize, setCartDrawerFullScreen, isMenuDrawerOpen, setMenuDrawerHidden]);

	const isNavItemExpanded = useRef(false);

	const newItemData = [
		{
			label: 'Shop All New',
			path: '/shop/new',
		},
		{
			label: 'Decks',
			path: '/shop/decks',
		},
		{
			label: 'Wheels',
			path: '/shop/wheels',
		},
		{
			label: 'Trucks',
			path: '/shop/trucks',
		},
		{
			label: 'Bearings',
			path: '/shop/bearings',
		},
		{
			label: 'Hardware',
			path: '/shop/hardware',
		},
		{
			label: 'Griptape',
			path: '/shop/griptape',
		},
	];

	const extrasItemData = [
		{
			label: 'Wax',
			path: '/shop/wax',
		},
		{
			label: 'Tools',
			path: '/shop/tools',
		},
		{
			label: 'Backpacks',
			path: '/shop/backpacks',
		},
	];

	return (
		<nav className={styles['navbar']}>
			<div className={styles['nav-layout']}>
				<div className={styles['nav-left']}>
					{!canFitMenu && (
						<div className={styles['nav-actions-item']} onClick={e => openMenuDrawer(e)}>
							<BiMenu />
						</div>
					)}
					<Link href={'/'} passHref>
						<a>
							<div className={styles['nav-brand']}>
								<Image
									src={isBrandLogoWhite ? '/bordz-brand-white.svg' : '/bordz-brand-black.svg'}
									alt="bordz logo"
									width="102px"
									height="35px"
								/>
							</div>
						</a>
					</Link>
					{canFitMenu && (
						<div
							className={styles['nav-items']}
							onMouseLeave={() => {
								isNavItemExpanded.current = false;
								setShouldOverlayContent(false);
							}}
						>
							<ExpandableNavItem
								isNavItemExpanded={isNavItemExpanded}
								setShouldOverlayContent={setShouldOverlayContent}
								itemData={newItemData}
							>
								<span>New</span>
							</ExpandableNavItem>
							<ExpandableNavItem
								isNavItemExpanded={isNavItemExpanded}
								setShouldOverlayContent={setShouldOverlayContent}
								itemData={extrasItemData}
							>
								<span>Extras</span>
							</ExpandableNavItem>
						</div>
					)}
				</div>
				{canFitSearchBar && (
					<div className={styles['search-bar']}>
						<SearchBar setIsSearchBarOpen={setIsSearchBarOpen} />
					</div>
				)}
				<div className={styles['nav-right']}>
					{!canFitSearchBar && (
						<div className={styles['nav-actions-item']} onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}>
							<BiSearch />
						</div>
					)}
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
					<div className={styles['wishlist-icon']}>
						<div className={styles['nav-actions-item']} style={{ marginRight: '0px', fontSize: '1.53rem' }}>
							<FaRegHeart />
						</div>
					</div>
					<div className={styles['cart-icon']} onClick={e => openCartDrawer(e)}>
						<div className={styles['nav-actions-item']}>
							<BiCart />
							{cartSize && cartSize > 0 ? <span className={styles['cart-size']}>{cartSize}</span> : <></>}
						</div>
					</div>
				</div>
			</div>
			{isSearchBarOpen && !canFitSearchBar && (
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
			{!canFitMenu && (
				<>
					{isMenuDrawerOpen && <Overlay />}
					<MenuDrawer>
						<SideMenu closeDrawer={closeMenuDrawer} isDrawerOpen={isMenuDrawerOpen} openRegModal={openRegModal} />
					</MenuDrawer>
				</>
			)}
			{isCartDrawerOpen && <Overlay />}
			<CartDrawer>
				<Cart closeDrawer={closeCartDrawer} />
			</CartDrawer>
		</nav>
	);
};

interface ExpandableNavItemProps {
	isNavItemExpanded: MutableRefObject<boolean>;
	setShouldOverlayContent: Dispatch<SetStateAction<boolean>>;
	itemData: { label: string; path: string }[];
	children: React.ReactNode;
}

const ExpandableNavItem: React.FunctionComponent<ExpandableNavItemProps> = ({ isNavItemExpanded, setShouldOverlayContent, itemData, children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const isMouseHovering = useRef(false);

	let delay: TimerHandler = () => {
		if (isMouseHovering.current) {
			setIsOpen(true);
			isNavItemExpanded.current = true;
			setShouldOverlayContent(true);
		}
	};

	const handleOnMouseEnter = () => {
		isMouseHovering.current = true;
		setTimeout(delay, isNavItemExpanded.current ? 0 : 200);
	};

	const handleOnMouseLeave = () => {
		isMouseHovering.current = false;
		setTimeout(() => setIsOpen(false), 10);
	};

	return (
		<div
			className={`${styles['nav-item']} ${isMouseHovering.current || isOpen ? styles['nav-item-highlighted'] : ''}`}
			onMouseEnter={handleOnMouseEnter}
			onMouseLeave={handleOnMouseLeave}
		>
			{children}
			{isOpen && (
				<div className={styles['sub-menu']}>
					{itemData.map(obj => {
						return (
							<Link href={obj.path} key={obj.label} passHref>
								<a>
									<div className={styles['sub-menu-item']}>{obj.label}</div>
								</a>
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Navbar;
