const toPriceString = (num: bigint | number): string => {
	return '$' + (Math.round(parseInt(num.toString()) * 0.01 * 100) / 100).toFixed(2);
};

export default toPriceString;
