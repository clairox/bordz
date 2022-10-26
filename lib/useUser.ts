import Router from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';
import { SessionUser } from '../types';

const useUser = ({ redirectTo = '', redirectIfFound = false }) => {
	const { data: user, mutate } = useSWR<SessionUser>('/api/session');

	useEffect(() => {
		if ((redirectTo && !redirectIfFound && !user) || (redirectIfFound && user)) {
			Router.push(redirectTo);
		}
	}, [user, redirectIfFound, redirectTo]);

	return { user };
};

export default useUser;
