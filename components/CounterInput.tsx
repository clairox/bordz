import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from '../styles/CounterInput.module.css';
import { BiMinus, BiPlus } from 'react-icons/bi';

interface CounterInputProps {
	minValue?: number;
	maxValue?: number;
	value?: number | string;
	increment?: () => void;
	decrement?: () => void;
	setValue: Dispatch<SetStateAction<number | string>>;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const CounterInput: React.FunctionComponent<CounterInputProps> = ({
	minValue = 1,
	maxValue,
	value = 1,
	increment,
	decrement,
	setValue,
	onChange,
	onBlur,
}) => {
	const handleDecrement = () => {
		if (decrement) {
			return decrement();
		}

		if (value <= minValue) {
			return setValue(minValue);
		}
		setValue(+value - 1);
	};

	const handleIncrement = () => {
		if (increment) {
			return increment();
		}

		if (maxValue && value >= maxValue) {
			return setValue(maxValue);
		}
		setValue(+value + 1);
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (onBlur) {
			return onBlur(e);
		}

		if (value === '') {
			setValue(minValue);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			return onChange(e);
		}

		if (e.target.value === '') {
			return setValue(e.target.value);
		}

		const v = +e.target.value;

		if (isNaN(v)) {
			return;
		}

		if (v <= minValue) {
			return setValue(minValue);
		} else if (maxValue && v >= maxValue) {
			return setValue(maxValue);
		}
		setValue(v);
	};

	return (
		<div className={styles['container']}>
			<div className={styles['button'] + ' ' + styles['decrement']} onClick={handleDecrement}>
				<BiMinus />
			</div>
			<input className={styles['input']} type="text" value={value} onBlur={handleBlur} onChange={e => handleChange(e)} />
			<div className={styles['button'] + ' ' + styles['increment']} onClick={handleIncrement}>
				<BiPlus />
			</div>
		</div>
	);
};

export default CounterInput;
