import React, { useEffect, useState } from 'react';
import styles from '../styles/LoginForm.module.css';
import mStyles from '../styles/Modal.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../context/authContext';
import Router from 'next/router';
import { LoginData } from '../types';
import { CgClose } from 'react-icons/cg';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';
import Image from 'next/image';

type LoginModalWrapperProps = {
	switchToRegister: (e: any) => void;
	closeModal: (e: any) => void;
};

export const LoginModalWrapper: React.FunctionComponent<LoginModalWrapperProps> = ({ switchToRegister, closeModal }) => {
	const handleSwitchToRegister = (e: any) => {
		switchToRegister(e);
	};

	const onFormComplete = (e: any) => {
		Router.reload();
	};

	return (
		<div>
			<div className={mStyles['close']}>
				<span onClick={e => closeModal(e)}>
					<CgClose />
				</span>
			</div>
			<div className={mStyles['content']}>
				<LoginForm {...{ handleSwitchToRegister, onFormComplete }} />
			</div>
		</div>
	);
};

type LoginFormProps = {
	handleSwitchToRegister: (e: any) => void;
	onFormComplete: (e: any) => void;
};

const LoginForm: React.FunctionComponent<LoginFormProps> = ({ handleSwitchToRegister, onFormComplete }) => {
	const {
		register,
		handleSubmit,
		formState: { isValid },
	} = useForm<LoginData>({
		mode: 'onChange',
		reValidateMode: 'onSubmit',
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	});

	const { user, login, isLoading } = useAuth();
	const [customError, setCustomError] = useState<{ message?: string } | null>(null);

	const onSubmit: SubmitHandler<LoginData> = async data => {
		setCustomError(null);
		if (login && !isLoading) {
			await login(data)
				.then(() => {
					onFormComplete(data);
				})
				.catch(err => {
					setCustomError({ message: err.message });
				});
		}
	};

	return (
		<div className={styles['container']}>
			<form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles['form-header']}>
					<h2>Login</h2>
				</div>
				<ul className={styles['error-messages']}>{customError && <li className={styles['error-message']}>{customError.message}</li>}</ul>
				<input type="email" placeholder="Email" {...register('email', { required: true, shouldUnregister: true })} />
				<input type="password" placeholder="Password" {...register('password', { required: true, shouldUnregister: true })} />
				<button className={user ? styles['loaded'] : ''} aria-label="Log In" type="submit" disabled={!isValid}>
					{isLoading ? (
						<div style={{ position: 'relative', bottom: '6px' }}>
							<Image src="/spinner.svg" alt="spinner" width="30px" height="30px" />
						</div>
					) : user ? (
						<div className={styles['check']}>
							<FaCheck />
						</div>
					) : (
						'Log In'
					)}
				</button>
				<span>
					{"Don't have an account? "}
					<a
						className={styles['link']}
						onClick={e => {
							handleSwitchToRegister(e);
						}}
					>
						Sign up
					</a>
				</span>
			</form>
		</div>
	);
};

export default LoginForm;
