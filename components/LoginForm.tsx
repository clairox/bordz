import React from 'react';
import styles from '../styles/LoginForm.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../context/authContext';
import Router from 'next/router';
import { LoginData } from '../types';

type RegisterModalWrapperProps = {
	switchToRegister: (e: any) => void;
	closeModal: (e: any) => void;
};

export const LoginModalWrapper: React.FunctionComponent<RegisterModalWrapperProps> = ({ switchToRegister, closeModal }) => {
	const handleSwitchToRegister = (e: any) => {
		switchToRegister(e);
	};

	const onFormComplete = (e: any) => {
		closeModal(e);
		Router.reload();
	};

	return <LoginForm {...{ handleSwitchToRegister, onFormComplete }} />;
};

type LoginFormProps = {
	handleSwitchToRegister: (e: any) => void;
	onFormComplete: (e: any) => void;
};
//TODO: fix page reloading if userinfo is wrong
const LoginForm: React.FunctionComponent<LoginFormProps> = ({ handleSwitchToRegister, onFormComplete }) => {
	const {
		register,
		handleSubmit,
		formState: { isValid, errors },
	} = useForm<LoginData>({ mode: 'onChange' });

	const { login } = useAuth();

	const onSubmit: SubmitHandler<LoginData> = async data => {
		await login!(data);
		onFormComplete(data);
	};

	return (
		<form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
			<h2 id={styles.loginHeader}>Login</h2>
			<input type="email" placeholder="Email" {...register('email', { required: true, shouldUnregister: true })} />
			<input type="password" placeholder="Password" {...register('password', { required: true, minLength: 8, shouldUnregister: true })} />
			<input type="submit" value="Log In" disabled={!isValid} />
			<span>
				{"Don't have an account? "}
				<a
					onClick={e => {
						handleSwitchToRegister(e);
					}}
				>
					Sign up
				</a>
			</span>
		</form>
	);
};

export default LoginForm;
