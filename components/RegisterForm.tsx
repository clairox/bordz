import React from 'react';
import styles from '../styles/LoginForm.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../context/authContext';
import Router from 'next/router';
import { RegisterData } from '../types';

type RegisterModalWrapperProps = {
	switchToLogin: (e: any) => void;
	closeModal: (e: any) => void;
};

export const RegisterModalWrapper: React.FunctionComponent<RegisterModalWrapperProps> = ({ switchToLogin, closeModal }) => {
	const handleSwitchToLogin = (e: any) => {
		switchToLogin(e);
	};

	const onFormComplete = (e: any) => {
		closeModal(e);
		Router.reload();
	};

	return <RegisterForm {...{ handleSwitchToLogin, onFormComplete }} />;
};

type RegisterFormProps = {
	handleSwitchToLogin: (e: any) => void;
	onFormComplete: (e: any) => void;
};
//TODO: create page for login and register for when user goes directly to private route
const RegisterForm: React.FunctionComponent<RegisterFormProps> = ({ handleSwitchToLogin, onFormComplete }) => {
	const {
		register,
		handleSubmit,
		formState: { isValid, errors },
	} = useForm<RegisterData>({ mode: 'onChange' });

	const { register: _register } = useAuth();

	const onSubmit: SubmitHandler<RegisterData> = async data => {
		await _register!(data);
		onFormComplete(data);
	};

	return (
		<form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
			<h2 id={styles.loginHeader}>Create account</h2>
			<input type="text" placeholder="First" {...register('firstName', { required: true, shouldUnregister: true })} />
			<input type="text" placeholder="Last" {...register('lastName', { required: true, shouldUnregister: true })} />
			<input type="email" placeholder="Email" {...register('email', { required: true, shouldUnregister: true })} />
			<input type="password" placeholder="Password" {...register('password', { required: true, minLength: 8, shouldUnregister: true })} />
			<input type="submit" value="Sign Up" disabled={!isValid} />
			<span>
				Already have an account?{' '}
				<a
					onClick={e => {
						handleSwitchToLogin(e);
					}}
				>
					Log in
				</a>
			</span>
		</form>
	);
};

export default RegisterForm;
