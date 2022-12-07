import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartItem, LoadState, LoginData, RegisterData } from '../types';

type AuthUser = {
	uid: string;
	firstName: string;
} | null;

const AuthContext = createContext<{
	user?: AuthUser;
	login?: (data: LoginData) => Promise<boolean>;
	register?: (data: RegisterData) => Promise<boolean>;
	logout?: () => void;
	isLoading?: boolean;
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
	const [isLoading, setIsLoading] = useState<boolean>(false);

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

	const login = async (data: LoginData): Promise<boolean> => {
		setIsLoading(true);
		return await axios
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
				setIsLoading(false);
				return loggedInUser;
			})
			.catch(err => {
				setIsLoading(false);
				switch (err.response.status) {
					case 404:
						throw {
							message: 'Incorrect email address',
						};
					case 401: {
						throw {
							message: 'Incorrect password',
						};
					}
					default:
						throw null;
				}
			});
	};

	const register = async (data: RegisterData): Promise<boolean> => {
		setIsLoading(true);
		const newUserData = {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			password: data.password,
		};
		await axios
			.post('/api/users', newUserData)
			.then(() => {})
			.catch(err => {
				setIsLoading(false);
				switch (err.response.status) {
					case 409:
						throw {
							message: 'An account with that email already exists',
						};
					default:
						throw null;
				}
			});

		return await axios
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
				setIsLoading(false);
				return registeredUser;
			})
			.catch(err => {
				setIsLoading(false);
				throw err;
			});
	};

	const logout = async () => {
		await axios.delete('/api/session', reqConfig).then(res => {
			setUser(res.data);
			localStorage.removeItem('cart-data');
			setIsLoading(false);
		});
	};

	useEffect(() => {
		setIsLoading(true);
		axios.get('/api/session', { withCredentials: true }).then(res => {
			setUser(res.data);
			setIsLoading(false);
		});
	}, []);

	return {
		user,
		login,
		register,
		logout,
		isLoading,
	};
};
