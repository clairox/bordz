import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartItem, LoadState, LoginData, RegisterData } from '../types';

type AuthUser = {
	uid: string;
	firstName: string;
} | null;

const AuthContext = createContext<{
	user?: AuthUser;
	login?: (data: LoginData) => void;
	register?: (data: RegisterData) => void;
	logout?: () => void;
	emailExists?: (email: string) => boolean;
}>({});

type AuthProviderProps = {
	children: React.ReactNode;
};

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({ children }) => {
	const auth = useProvideAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};

const useProvideAuth = () => {
	const [user, setUser] = useState<AuthUser | null>();
	const [authState, setAuthState] = useState<LoadState>('idle');

	const reqConfig = { withCredentials: true };

	const mergeLocalCartWithDB = async (uid: string) => {
		let dbCartNewItemQueue: CartItem[] = JSON.parse(localStorage.getItem('cart-data') || '[]');
		let cartId: string = '';
		await axios
			.get(`/api/carts/?uid=${uid}`)
			.then(res => {
				cartId = res.data.id;
			})
			.catch(() => {});

		if (!dbCartNewItemQueue.length || !cartId) return;

		await axios.put(
			`/api/carts/${cartId}/items`,
			JSON.stringify({
				items: dbCartNewItemQueue.map(item => {
					return {
						pid: item.pid,
						linePrice: item.linePrice,
						quantity: item.quantityInCart,
					};
				}),
			}),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	};

	const login = async (data: LoginData) => {
		console.log(data);
		if (authState === 'idle' || authState === 'failed') {
			setAuthState('loading');
			await axios
				.post(
					'/api/session/new',
					{
						email: data.email,
						password: data.password,
					},
					reqConfig
				)
				.then(async res => {
					const loggedInUser = res.data;

					await mergeLocalCartWithDB(loggedInUser.uid);
					setUser(loggedInUser);
					setAuthState('succeeded');
				})
				.catch(() => {});
		}
	};

	const register = async (data: RegisterData) => {
		if (authState === 'idle' || authState === 'failed') {
			setAuthState('loading');
			const newUserData = {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				password: data.password,
			};
			await axios.post('/api/users', newUserData);

			await axios
				.post(
					'/api/session/new',
					{
						email: data.email,
						password: data.password,
					},
					reqConfig
				)
				.then(async res => {
					const registeredUser = res.data;

					await mergeLocalCartWithDB(registeredUser.uid);
					setUser(registeredUser);
					setAuthState('succeeded');
				})
				.catch(() => {
					return null;
				});
		}
	};
	//TODO: fix cartSize updating before page refresh
	const logout = async () => {
		await axios.delete('/api/session', reqConfig).then(res => {
			setUser(res.data);
			localStorage.removeItem('cart-data');
			setAuthState('idle');
		});
	};

	useEffect(() => {
		if (authState === 'idle') {
			setAuthState('loading');
			axios.get('/api/session', { withCredentials: true }).then(res => {
				setUser(res.data);
				if (res.data) {
					setAuthState('succeeded');
				} else {
					setAuthState('failed');
				}
			});
		}
	}, [authState]);

	return {
		user,
		login,
		register,
		logout,
		authState,
	};
};
