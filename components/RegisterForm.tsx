import React, { useState } from 'react';
import styles from '../styles/LoginForm.module.css';
import mStyles from '../styles/Modal.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../context/authContext';
import Router from 'next/router';
import { RegisterData } from '../types';
import { CgClose } from 'react-icons/cg';
import Image from 'next/image';
import { FaCheck } from 'react-icons/fa';

type RegisterModalWrapperProps = {
	switchToLogin: (e: any) => void;
	closeModal: (e: any) => void;
};

export const RegisterModalWrapper: React.FunctionComponent<RegisterModalWrapperProps> = ({ switchToLogin, closeModal }) => {
	const handleSwitchToLogin = (e: any) => {
		switchToLogin(e);
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
				<RegisterForm {...{ handleSwitchToLogin, onFormComplete }} />
			</div>
		</div>
	);
};

type RegisterFormProps = {
	handleSwitchToLogin: (e: any) => void;
	onFormComplete: (e: any) => void;
};

const RegisterForm: React.FunctionComponent<RegisterFormProps> = ({ handleSwitchToLogin, onFormComplete }) => {
	const {
		register,
		handleSubmit,
		formState: { isValid },
	} = useForm<RegisterData>({
		mode: 'onChange',
		reValidateMode: 'onSubmit',
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	});

	const { user, register: _register, isLoading } = useAuth();
	const [customError, setCustomError] = useState<{ message?: string } | null>(null);

	const onSubmit: SubmitHandler<RegisterData> = async data => {
		setCustomError(null);
		if (_register && !isLoading) {
			await _register(data)
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
					<h2>Create Account</h2>
				</div>

				<ul className={styles['error-messages']}>{customError && <li className={styles['error-message']}>{customError.message}</li>}</ul>
				<input type="text" placeholder="First" {...register('firstName', { required: true, shouldUnregister: true })} />
				<input type="text" placeholder="Last" {...register('lastName', { required: true, shouldUnregister: true })} />
				<input type="email" placeholder="Email" {...register('email', { required: true, shouldUnregister: true })} />
				<input type="password" placeholder="Password" {...register('password', { required: true, minLength: 8, shouldUnregister: true })} />
				<button className={user ? styles['loaded'] : ''} aria-label="Sign Up" type="submit" disabled={!isValid}>
					{isLoading ? (
						<div style={{ position: 'relative', bottom: '6px' }}>
							<Image src="/spinner.svg" alt="spinner" width="30px" height="30px" />
						</div>
					) : user ? (
						<div className={styles['check']}>
							<FaCheck />
						</div>
					) : (
						'Sign Up'
					)}
				</button>
				<span>
					Already have an account?{' '}
					<a
						className={styles['link']}
						onClick={e => {
							handleSwitchToLogin(e);
						}}
					>
						Log in
					</a>
				</span>
			</form>
		</div>
	);
};

export default RegisterForm;
