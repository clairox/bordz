import Router from 'next/router';
import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import styles from '../../styles/LoginPage.module.css';

//TODO: prevent seeing this page or register page when already logged in
const Login: React.FunctionComponent = () => {
	const handleSwitchToRegister = () => {
		setForm(<RegisterForm handleSwitchToLogin={handleSwitchToLogin} onFormComplete={onRegisterFormComplete} />);
	};

	const handleSwitchToLogin = () => {
		setForm(<LoginForm handleSwitchToRegister={handleSwitchToRegister} onFormComplete={onLoginFormComplete} />);
	};

	const onRegisterFormComplete = () => {
		Router.replace('/');
	};

	const onLoginFormComplete = () => {
		Router.replace('/');
	};

	const [form, setForm] = useState<React.ReactNode>(
		<LoginForm handleSwitchToRegister={handleSwitchToRegister} onFormComplete={onLoginFormComplete} />
	);

	return <div className={styles['container']}>{form}</div>;
};

export default Login;
