export type PriceRanges = { [key: string]: boolean };

export interface ProductBasic {
	id: number;
	name: string;
	handle: string;
	price: number;
	quantity: number;
	brand: string;
	category: string;
	images: string[];
}

export interface Product extends ProductBasic {
	description: string;
	details: string[];
}

export interface CartItem {
	pid: int;
	name: string;
	price: number;
	linePrice: number;
	quantityInCart: number;
	images: string[];
	createdAt: Date;
	quantityInStock: number;
	cartId?: string;
}

export interface SessionUser {
	isLoggedIn: boolean;
	uid: number;
}

export interface Order {
	id: number;
	uid: number;
	orderItems: OrderItemWithProduct[];
	total: number;
	createdAt: string;
}

export interface OrderItem {
	pid: number;
	orderId: number;
	quantity: number;
	createdAt: string;
}

export interface OrderItemWithProduct extends OrderItem {
	product: Product;
}

export interface UserInfo {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
}

export interface UserInfoWithOrders extends UserInfo {
	orders: Order[];
}

export interface LoginData {
	email: string;
	password: string;
}

export interface RegisterData extends LoginData {
	firstName: string;
	lastName: string;
}

export type LoadState = 'idle' | 'loading' | 'succeeded' | 'failed';

export type ModalState = 'open' | 'closed';
