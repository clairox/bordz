import Router from 'next/router';
import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
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

	return <div className={styles['container']}>{form}</div>;
};

export default Register;
