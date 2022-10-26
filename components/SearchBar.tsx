import Router from 'next/router';
import React, { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from '../styles/SearchBar.module.css';

interface SearchBarProps {
	setIsSearchBarOpen?: Dispatch<SetStateAction<boolean>>;
}

const SearchBar: React.FunctionComponent<SearchBarProps> = ({ setIsSearchBarOpen }) => {
	type SearchQuery = { query: string };
	const { register, handleSubmit, reset } = useForm<SearchQuery>({ mode: 'onChange' });

	const onSubmit: SubmitHandler<SearchQuery> = async data => {
		if (!data.query) {
			return;
		}
		await Router.push(`/search?q=${data.query}`);
		reset();
		if (setIsSearchBarOpen) {
			setIsSearchBarOpen(false);
		}
	};

	return (
		<form className={styles['search-bar']} onSubmit={handleSubmit(onSubmit)}>
			<input type="text" placeholder="Search" {...register('query')} />
		</form>
	);
};

export default SearchBar;
