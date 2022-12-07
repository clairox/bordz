import React from 'react';
import styles from '../styles/Account.module.css';
import Router from 'next/router';
import { useAuth } from '../context/authContext';

interface AccountMenuProps {
	firstName: string;
}

const AccountMenu: React.FunctionComponent<AccountMenuProps> = ({ firstName }) => {
	const { logout } = useAuth();
	return (
		<div className={styles['main-container']}>
			<div className={styles['layout']}>
				<div>
					<ul className={styles['menu']}>
						<li className={styles['menu-option']} onClick={() => Router.push('/account/details')}>
							<p>Account Details</p>
						</li>
						<li className={styles['menu-option']} onClick={() => Router.push('/account/orders')}>
							<p>Orders</p>
						</li>
						<li className={styles['menu-option']} onClick={() => Router.push('/account/change-password')}>
							<p>Change Password</p>
						</li>
						<li className={styles['menu-option']} onClick={() => Router.push('/account/settings')}>
							<p>Settings</p>
						</li>
						<li
							className={styles['menu-option']}
							onClick={async () => {
								await logout!();
								Router.reload();
							}}
						>
							<p>Logout</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default AccountMenu;
