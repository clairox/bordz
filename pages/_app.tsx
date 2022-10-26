import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CartProvider } from '../context/cartContext';
import { AuthProvider } from '../context/authContext';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<CartProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</CartProvider>
		</AuthProvider>
	);
}

export default MyApp;
