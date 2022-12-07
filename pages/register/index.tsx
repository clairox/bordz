import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import { sessionOptions } from '../../lib/withSession';
import styles from '../../styles/LoginPage.module.css';

type RegisterProps = {
	redirectTo?: string;
};

const Register: React.FunctionComponent<RegisterProps> = ({ redirectTo }) => {
	const handleSwitchToRegister = () => {
		setForm(<RegisterForm handleSwitchToLogin={handleSwitchToLogin} onFormComplete={onRegisterFormComplete} />);
	};

	const handleSwitchToLogin = () => {
		setForm(<LoginForm handleSwitchToRegister={handleSwitchToRegister} onFormComplete={onLoginFormComplete} />);
	};

	const onRegisterFormComplete = () => {
		Router.replace(redirectTo || '/');
	};

	const onLoginFormComplete = () => {
		Router.replace(redirectTo || '/');
	};

	const [form, setForm] = useState<React.ReactNode>(
		<RegisterForm handleSwitchToLogin={handleSwitchToLogin} onFormComplete={onRegisterFormComplete} />
	);

	return (
		<div className={styles['container']}>
			<Head>
				<title>Sign Up | Bordz</title>
			</Head>
			{form}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = withIronSessionSsr((context: any) => {
	if (context.req.session.user) {
		return {
			redirect: {
				destination: '/',
				statusCode: 302,
			},
			props: {},
		};
	}

	return {
		props: {},
	};
}, sessionOptions);

export default Register;
