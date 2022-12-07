import React, { useState, useEffect } from 'react';

const useWindowSize = () => {
	interface WindowSize {
		width: number | string | undefined;
		height: number | string | undefined;
	}
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: undefined,
		height: undefined,
	});

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const handleResize = () => {
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight,
				});
			};

			window.addEventListener('resize', handleResize);

			handleResize();

			return () => window.removeEventListener('resize', handleResize);
		}
	}, []);

	return {
		windowSize,
	};
};

export default useWindowSize;
