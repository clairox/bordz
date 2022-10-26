import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, LoadState } from '../types';
import { useAuth } from './authContext';

const CartContext = createContext<{
	cart?: CartItem[];
	addToCart?: (pid: number, quantity: number) => void;
	deleteFromCart?: (pid: number) => void;
	incrementItemQuantity?: (pid: number) => void;
	decrementItemQuantity?: (pid: number) => void;
	setItemQuantity?: (pid: number, quantity: number) => Promise<number>;
	clearCart?: () => void;
	cartState?: LoadState;
	cartSize?: number;
}>({});

type CartProviderProps = {
	children: React.ReactNode;
};

export const CartProvider: React.FunctionComponent<CartProviderProps> = ({ children }) => {
	const cart = useProvideCart();
	return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

export const useCart = () => {
	return useContext(CartContext);
};

const useProvideCart = () => {
	const [cart, setCart] = useState<CartItem[]>([]);
	const [cartId, setCartId] = useState<string>('');
	const [cartState, setCartState] = useState<LoadState>('idle');
	const [cartSize, setCartSize] = useState<number>(0);

	let { user } = useAuth();

	const reqConfig = { withCredentials: true };

	const sortByNewest = (unsorted: CartItem[]): CartItem[] => {
		return unsorted.sort((a: CartItem | null, b: CartItem | null) => +new Date(b!.createdAt) - +new Date(a!.createdAt));
	};

	const getLocalCart = (): any => {
		return sortByNewest(JSON.parse(localStorage.getItem('cart-data') || '[]'));
	};

	const setLocalCart = (value: any): void => {
		localStorage.setItem('cart-data', JSON.stringify(value));
		setCartSize(getLocalCart().reduce((q: number, c: CartItem) => q + c.quantityInCart, 0));
		setCart(getLocalCart());
	};

	const clearCart = async (): Promise<void> => {
		if (cartState === 'succeeded') {
			await axios.delete(`/api/cart-items?cartId=${cartId}`);
		}
		setLocalCart([]);
	};

	const addToCart = async (pid: number, quantity: number): Promise<void> => {
		let localCart: CartItem[] = getLocalCart();
		let existingItem = localCart.find((item: CartItem) => item.pid === pid);

		const product = await axios
			.get(`/api/products/${pid}`)
			.then(res => {
				return res.data;
			})
			.catch(() => {});

		if (cartState === 'succeeded') {
			await axios
				.put(`/api/carts/${cartId}/items`, { product, quantity }, reqConfig)
				.then(res => {
					const data = res.data;
					const cartItem: CartItem = {
						cartId: data.cartId,
						createdAt: data.createdAt,
						images: data.product.images,
						linePrice: data.linePrice,
						name: data.product.name,
						price: data.product.price,
						pid: data.pid,
						quantityInCart: data.quantity,
						quantityInStock: data.product.quantity,
					};

					let newLocalCart: CartItem[] = [];

					// if item already exists locally
					// replace it with same item with updated quantity
					if (existingItem) {
						newLocalCart = localCart.filter((item: CartItem) => item.pid !== cartItem.pid).concat(cartItem);
					} else {
						newLocalCart = localCart.concat(cartItem);
					}

					setLocalCart(newLocalCart);
				})
				.catch(() => {});
		} else {
			let newLocalCart: CartItem[] = [];

			// if item already exists locally
			// replace it with same item with updated quantity
			if (existingItem) {
				newLocalCart = localCart
					.filter((item: CartItem) => item.pid !== pid)
					.concat({
						...existingItem,
						quantityInCart: existingItem.quantityInCart + 1,
						linePrice: existingItem.linePrice + existingItem.price,
					});
			} else {
				newLocalCart = localCart.concat({
					createdAt: new Date(),
					linePrice: product.price * quantity,
					quantityInCart: quantity,
					images: product.images,
					name: product.name,
					price: product.price,
					pid: product.id,
					quantityInStock: product.quantity,
				});
			}

			setLocalCart(newLocalCart);
		}
	};

	const deleteFromCart = async (pid: number): Promise<void> => {
		if (cartState === 'succeeded') {
			await axios.delete(`/api/carts/${cartId}/items/${pid}`, reqConfig);
		}
		const newLocalCart = getLocalCart().filter((item: CartItem) => item.pid !== pid);
		setLocalCart(newLocalCart);
	};

	const incrementItemQuantity = async (pid: number): Promise<void> => {
		const localCart: CartItem[] = getLocalCart();
		const item = localCart.find((item: CartItem) => item.pid === pid);

		if (!item) {
			return;
		}

		let newLocalCart = localCart.filter((item: CartItem) => item.pid !== pid);

		if (cartState === 'succeeded') {
			await axios
				.patch(`/api/carts/${cartId}/items/${pid}`, {
					quantity: {
						increment: 1,
					},
					reqConfig,
				})
				.then(res => {
					const data = res.data;
					const cartItem = {
						cartId: data.cartId,
						createdAt: data.createdAt,
						images: data.product.images,
						linePrice: data.linePrice,
						name: data.product.name,
						price: data.product.price,
						pid: data.pid,
						quantityInCart: data.quantity,
						quantityInStock: data.product.quantity,
					};

					newLocalCart.push(cartItem);
				});
		} else {
			const newQuantity = item.quantityInCart + 1;
			newLocalCart.push({
				...item,
				quantityInCart: newQuantity,
				linePrice: item.linePrice + item.price,
			});
		}
		setLocalCart(newLocalCart);
	};

	const decrementItemQuantity = async (pid: number): Promise<void> => {
		const localCart = getLocalCart();
		const item = localCart.find((item: CartItem) => item.pid === pid);

		if (!item) {
			return;
		}

		let newLocalCart = localCart.filter((item: CartItem) => item.pid !== pid);

		if (item.quantityInCart <= 1) {
			deleteFromCart(pid);
			return;
		}

		if (cartState === 'succeeded') {
			await axios
				.patch(`/api/carts/${cartId}/items/${pid}`, {
					quantity: {
						decrement: 1,
					},
					reqConfig,
				})
				.then(res => {
					const data = res.data;
					const cartItem = {
						cartId: data.cartId,
						createdAt: data.createdAt,
						images: data.product.images,
						linePrice: data.linePrice,
						name: data.product.name,
						price: data.product.price,
						pid: data.pid,
						quantityInCart: data.quantity,
						quantityInStock: data.product.quantity,
					};

					newLocalCart.push(cartItem);
				});
		} else {
			const newQuantity = item.quantityInCart - 1;
			newLocalCart.push({
				...item,
				quantityInCart: newQuantity,
				linePrice: item.linePrice - item.price,
			});
		}

		setLocalCart(newLocalCart);
	};

	const setItemQuantity = async (pid: number, quantity: number): Promise<number> => {
		const localCart = getLocalCart();
		const item = localCart.find((item: CartItem) => item.pid === pid);

		if (!item) {
			//TODO: create cartItem
		}

		let newLocalCart = localCart.filter((item: CartItem) => item.pid !== pid);

		if (cartState === 'succeeded') {
			const data = await axios
				.patch(`/api/carts/${cartId}/items/${pid}`, {
					quantity: quantity,
					reqConfig,
				})
				.then(res => {
					const data = res.data;
					const cartItem = {
						cartId: data.cartId,
						createdAt: data.createdAt,
						images: data.product.images,
						linePrice: data.linePrice,
						name: data.product.name,
						price: data.product.price,
						pid: data.pid,
						quantityInCart: data.quantity,
						quantityInStock: data.product.quantity,
					};

					return cartItem;
				});

			newLocalCart.push(data);
			setLocalCart(newLocalCart);
			return data.quantityInCart;
		} else {
			const newQuantity = quantity;

			newLocalCart.push({
				...item,
				quantityInCart: newQuantity,
				linePrice: item.price * newQuantity,
			});
			setLocalCart(newLocalCart);
			return newQuantity;
		}
	};

	useEffect(() => {
		if (user && cartState === 'idle') {
			//TODO: wait for user to load to do !user
			setCartState('loading');
			axios
				.get(`/api/carts/?uid=${user.uid}&populated=true`)
				.then(res => {
					const data = res.data;
					const cartItems: CartItem[] = data.items.map((item: any) => {
						return {
							cartId: item.cartId,
							createdAt: item.createdAt,
							images: item.product.images,
							linePrice: item.linePrice,
							name: item.product.name,
							price: item.product.price,
							pid: item.pid,
							quantityInCart: item.quantity,
							quantityInStock: item.product.quantity,
						};
					});
					localStorage.setItem('cart-data', JSON.stringify(cartItems));
					setCart(sortByNewest(cartItems));
					setCartId(data.id);
					setCartSize(cartItems.reduce((q: number, c: CartItem) => q + c.quantityInCart, 0));
					setCartState('succeeded');
				})
				.catch(err => {
					setCart([]);
					setCartState('failed');
				});
		} else if (cartState === 'idle') {
			let localCart = JSON.parse(localStorage.getItem('cart-data') || '[]');

			if (!localCart.length) {
				localStorage.setItem('cart-data', JSON.stringify(localCart));
			}

			setCart(sortByNewest(localCart));
			setCartSize(localCart.reduce((q: number, c: any) => q + c.quantityInCart, 0));
		}
	}, [cartState, user]);

	//TODO: maybe get cart id as well
	return {
		cart,
		addToCart,
		deleteFromCart,
		incrementItemQuantity,
		decrementItemQuantity,
		setItemQuantity,
		clearCart,
		cartState,
		cartSize,
	};
};
