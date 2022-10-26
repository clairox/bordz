const createHandle = (str: string): string =>
	encodeURIComponent(str.toLowerCase())
		.replace(/[^a-zA-Z0-9 \s]/gi, '')
		.replace(/\s+/g, '-')
		.toLowerCase();

export default createHandle;
