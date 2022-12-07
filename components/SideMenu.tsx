import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/SideMenu.module.css';
import optionStyles from '../styles/MenuOption.module.css';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';
import { useAuth } from '../context/authContext';
import Router from 'next/router';
import { CgClose } from 'react-icons/cg';
import LoadingOverlay from './LoadingOverlay';

interface SideMenuProps {
	closeDrawer: (e: any) => void;
	isDrawerOpen: boolean;
	openRegModal: (e: any) => void;
}

interface ExpandableMenuOptionProps {
	handleNavLinkClick: (e: any) => void;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	label: string;
	links: { [key: string]: string };
}

const ExpandableMenuOption: React.FunctionComponent<ExpandableMenuOptionProps> = ({ handleNavLinkClick, isOpen, setIsOpen, links, label }) => {
	const handleNavDropLinkClick = (e: any) => {
		handleNavLinkClick(e);
	};

	return (
		<div className={`${optionStyles['expandable']} ${isOpen && optionStyles['expanded']}`}>
			<div className={`${optionStyles['option']}  ${optionStyles['highlighted']}`} onClick={() => setIsOpen(!isOpen)}>
				{label}
				<span className={optionStyles['chevron']}>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
			</div>
			<ul>
				{Object.keys(links).map(key => {
					return (
						<li key={links[key]}>
							<Link href={links[key]} passHref>
								<a onClick={e => handleNavDropLinkClick(e)}>
									<div className={optionStyles['nested-option']}>{key}</div>
								</a>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

interface MenuOptionProps {
	handleNavLinkClick: (e: any) => void;
	label: string;
	linkTo: string;
}

const MenuOption: React.FunctionComponent<MenuOptionProps> = ({ handleNavLinkClick, label, linkTo }) => {
	return (
		<Link href={linkTo} passHref>
			<a onClick={handleNavLinkClick}>
				<div className={optionStyles['option']}>{label}</div>
			</a>
		</Link>
	);
};

const SideMenu: React.FunctionComponent<SideMenuProps> = ({ closeDrawer, isDrawerOpen, openRegModal }) => {
	const [isNewOpen, setIsNewOpen] = useState<boolean>(false);
	const [isExtrasOpen, setIsExtrasOpen] = useState<boolean>(false);

	const { user, logout } = useAuth();

	const handleNavLinkClick = (e: any) => {
		setIsNewOpen(false);
		setIsExtrasOpen(false);
		closeDrawer(e);
	};

	useEffect(() => {
		if (isDrawerOpen) {
			setIsNewOpen(false);
			setIsExtrasOpen(false);
		}
	}, [isDrawerOpen]);

	const newLinks = {
		'All New': '/shop/new',
		Decks: '/shop/decks',
		Wheels: '/shop/wheels',
		Trucks: '/shop/trucks',
		Griptape: '/shop/griptape',
		Bearings: '/shop/bearings',
		Hardware: '/shop/hardware',
	};

	const extrasLinks = {
		Wax: '/shop/wax',
		Tools: '/shop/tools',
		Backpacks: '/shop/backpacks',
	};

	return (
		<>
			<div className={styles['header']}>
				<h2 className={styles['title']}>Menu</h2>
				<span className={styles['close']} onClick={e => closeDrawer(e)}>
					<CgClose />
				</span>
			</div>
			<div className={styles['container']}>
				<ul>
					<li>
						<ExpandableMenuOption
							label={'new'}
							links={newLinks}
							isOpen={isNewOpen}
							setIsOpen={setIsNewOpen}
							handleNavLinkClick={e => handleNavLinkClick(e)}
						/>
					</li>
					<li>
						<MenuOption {...{ handleNavLinkClick, label: 'Shop All', linkTo: '/shop/new' }} />
					</li>
					<li>
						<MenuOption {...{ handleNavLinkClick, label: 'Decks', linkTo: '/shop/decks' }} />
					</li>
					<li>
						<MenuOption {...{ handleNavLinkClick, label: 'Wheels', linkTo: '/shop/wheels' }} />
					</li>
					<li>
						<MenuOption {...{ handleNavLinkClick, label: 'Trucks', linkTo: '/shop/trucks' }} />
					</li>
					<li>
						<MenuOption {...{ handleNavLinkClick, label: 'Griptape', linkTo: '/shop/griptape' }} />
					</li>
					<li>
						<MenuOption {...{ handleNavLinkClick, label: 'Bearings', linkTo: '/shop/bearings' }} />
					</li>
					<li>
						<MenuOption {...{ handleNavLinkClick, label: 'Hardware', linkTo: '/shop/hardware' }} />
					</li>
					<li>
						<ExpandableMenuOption
							label={'extras'}
							links={extrasLinks}
							isOpen={isExtrasOpen}
							setIsOpen={setIsExtrasOpen}
							handleNavLinkClick={handleNavLinkClick}
						/>
					</li>
				</ul>
				<div className={styles['footer']}>
					<ul>
						<li>
							<Link href="/account">
								<a onClick={handleNavLinkClick}>
									<div className={styles['footer-item']}>My Account</div>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/account/orders">
								<a onClick={handleNavLinkClick}>
									<div className={styles['footer-item']}>Orders</div>
								</a>
							</Link>
						</li>
						{user ? (
							<li>
								<a
									onClick={async e => {
										e.preventDefault();
										handleNavLinkClick(e);
										await logout!();
										Router.reload();
									}}
								>
									<div className={styles['footer-item']}>Logout</div>
								</a>
							</li>
						) : (
							<li>
								<a
									onClick={async e => {
										e.preventDefault();
										handleNavLinkClick(e);
										openRegModal(e);
									}}
								>
									<div className={styles['footer-item']}>Sign Up / Log in</div>
								</a>
							</li>
						)}
					</ul>
				</div>
			</div>
		</>
	);
};

export default SideMenu;
