import React, { Dispatch, SetStateAction } from 'react';
import { Range, getTrackBackground } from 'react-range';

interface RangeSliderProps {
	step: number;
	min: number;
	max: number;
	values: number[];
	setValues: Dispatch<SetStateAction<number[]>>;
}

const RangeSlider: React.FunctionComponent<RangeSliderProps> = ({ step, min, max, values, setValues }) => {
	return (
		<Range
			values={values}
			step={step}
			min={min}
			max={max}
			onChange={values => {
				setValues(values);
			}}
			renderTrack={({ props, children }) => (
				<div
					onMouseDown={props.onMouseDown}
					onTouchStart={props.onTouchStart}
					style={{
						...props.style,
						height: '36px',
						display: 'flex',
						width: '100%',
					}}
				>
					<div
						ref={props.ref}
						style={{
							height: '5px',
							width: '100%',
							borderRadius: '4px',
							background: getTrackBackground({
								values,
								colors: ['#ccc', 'var(--primary-color)', '#ccc'],
								min,
								max,
							}),
							alignSelf: 'center',
						}}
					>
						{children}
					</div>
				</div>
			)}
			renderThumb={({ props, isDragged }) => (
				<div
					{...props}
					style={{
						...props.style,
						height: '20px',
						width: '20px',
						borderRadius: '100%',
						backgroundColor: 'var(--primary-color)',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						boxShadow: '0px 2px 6px #AAA',
					}}
				></div>
			)}
		/>
	);
};

export default RangeSlider;
