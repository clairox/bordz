import React from 'react';

type ErrorPageProps = {
	statusCode: number;
};

const ErrorPage: React.FunctionComponent<ErrorPageProps> = ({ statusCode }) => {
	return <div>{statusCode} Error</div>;
};

export default ErrorPage;
