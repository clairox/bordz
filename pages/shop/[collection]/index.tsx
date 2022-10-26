import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { Prisma } from '@prisma/client';

import collections from '../../../lib/collections';
import prisma from '../../../lib/prisma';
import toPriceString from '../../../lib/toPriceString';
import useDrawer from '../../../hooks/useDrawer';

import Overlay from '../../../components/Overlay';
import Pagination from '../../../components/Pagination';
import RangeSlider from '../../../components/RangeSlider';

import { ProductBasic } from '../../../types';

import styles from '../../../styles/Shop.module.css';

import { CgClose } from 'react-icons/cg';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';

interface ShopProps {
	products: ProductBasic[];
	categoryFilters: { id: number; name: string }[];
	brandFilters: { id: number; name: string }[];
	currentCategories: { id: number; name: string }[];
	currentBrands: { id: number; name: string }[];
	currentPriceRange: number[];
	productCount: number;
}

interface ContentProps {
	products: ProductBasic[];
	productCount: number;
	openFilterDrawer: (e: any) => void;
	openSortDrawer: (e: any) => void;
}

interface ProductListItemProps {
	product: ProductBasic;
}

interface SidebarProps {
	categoryFilters: { id: number; name: string }[];
	brandFilters: { id: number; name: string }[];
	selectedCategories: number[];
	selectedBrands: number[];
	priceRange: number[];
	setSelectedCategories: Dispatch<SetStateAction<number[]>>;
	setSelectedBrands: Dispatch<SetStateAction<number[]>>;
	setPriceRange: Dispatch<SetStateAction<number[]>>;
}

type Section = 'category' | 'brand';

interface FilterDrawerProps extends SidebarProps {
	closeDrawer: (e: any) => void;
	refine: (cids: number[], bids: number[], pr: number[]) => Promise<boolean>;
	minPrice: number;
	maxPrice: number;
	clearFilters: () => void;
	isDrawerOpen: boolean;
}

interface FilterSectionProps {
	checkboxProps: FilterCheckboxInputProps[];
	label: string;
	isDrawerOpen: boolean;
}

interface FilterPriceSectionProps {
	priceRange: number[];
	setPriceRange: Dispatch<SetStateAction<number[]>>;
	minPrice: number;
	maxPrice: number;
	label: string;
	isDrawerOpen: boolean;
}

interface SortDrawerProps {
	closeDrawer: (e: any) => void;
}

interface FilterCheckboxInputProps {
	section: Section;
	label: string;
	value: number;
	setIsSelectedValue: (section: Section, value: number, isSelectedValue: boolean) => void;
	checked: boolean;
}

const Shop: React.FunctionComponent<ShopProps> = props => {
	const { query } = useRouter();

	const [selectedCategories, setSelectedCategories] = useState(props.currentCategories.map(c => c.id) as number[]);
	const [selectedBrands, setSelectedBrands] = useState(props.currentBrands.map(b => b.id) as number[]);
	const [priceRange, setPriceRange] = useState(props.currentPriceRange);

	const MIN_PRICE = 0;
	const MAX_PRICE = 10000;

	const clearFilters = () => {
		setSelectedCategories([]);
		setSelectedBrands([]);
		setPriceRange([MIN_PRICE, MAX_PRICE]);
	};

	const refine = async (cids: number[], bids: number[], pr: number[]) => {
		const { category, brand, priceRange, page, ...newQuery } = query;

		if (cids.length) newQuery.category = cids.join(',');
		if (bids.length) newQuery.brand = bids.join(',');
		if ((pr.length === 2 && pr[0] !== 0) || pr[1] !== 10000) {
			newQuery.priceRange = pr.join(',');
		}

		return await Router.push({
			pathname: Router.pathname,
			query: newQuery,
		});
	};

	const { products, ...rest } = props;

	const {
		openDrawer: openFilterDrawer,
		closeDrawer: closeFilterDrawer,
		isOpen: isFilterDrawerOpen,
		Drawer: FD,
	} = useDrawer({ id: 'filter-drawer', side: 'right' });

	const {
		openDrawer: openSortDrawer,
		closeDrawer: closeSortDrawer,
		isOpen: isSortDrawerOpen,
		Drawer: SD,
	} = useDrawer({ id: 'sort-drawer', side: 'right' });

	const sidebarProps = {
		...rest,
		refine,
		selectedCategories,
		selectedBrands,
		priceRange,
		setSelectedCategories,
		setSelectedBrands,
		setPriceRange,
		minPrice: MIN_PRICE,
		maxPrice: MAX_PRICE,
		isDrawerOpen: isFilterDrawerOpen,
		clearFilters,
	};

	return (
		<div className={styles['container']}>
			{/*<ShopSidebar {...sidebarProps} />*/}

			<Content products={products} productCount={props.productCount} openFilterDrawer={openFilterDrawer} openSortDrawer={openSortDrawer} />
			{(isFilterDrawerOpen || isSortDrawerOpen) && <Overlay />}
			<FD>
				<FilterDrawer {...sidebarProps} closeDrawer={closeFilterDrawer} />
			</FD>
			<SD>
				<SortDrawer closeDrawer={closeSortDrawer} />
			</SD>
		</div>
	);
};

const Content: React.FunctionComponent<ContentProps> = ({ products, productCount, openFilterDrawer, openSortDrawer }) => {
	const { query } = useRouter();
	const collection = collections[query.collection as string];

	const onPageChange = (page: number) => {
		Router.push({
			pathname: Router.pathname,
			query: { ...query, page },
		});
	};
	return (
		<div className={styles['products']}>
			{/*<SortSelect />*/}
			<div className={styles['collection-header']}>
				<div className={styles['breadcrumb']}>
					<Link href="/shop/new">
						<a>Shop</a>
					</Link>
					<a>{collection}</a>
				</div>
				<h2 className={styles['header-text']}>{collection}</h2>
			</div>

			<div className={styles['filter-sort']}>
				<button className={styles['sort-button']} onClick={e => openSortDrawer(e)}>
					Sort
				</button>
				<button className={styles['filter-button']} onClick={e => openFilterDrawer(e)}>
					Filter
				</button>
			</div>

			<section className={styles['product-grid-container']}>
				<p className={styles['product-grid-result-msg']}>
					{products.length ? `${productCount} result${productCount > 1 ? 's' : ''} found` : 'No results found'}
				</p>
				<div className={styles['product-grid']}>
					{products.map(product => (
						<ProductListItem product={product} key={product.id} />
					))}
				</div>
			</section>
			<div className={styles['pagination-container']}>
				<Pagination
					{...{
						onPageChange: onPageChange,
						totalCount: productCount,
						currentPage: parseInt(query?.page as string) || 1,
						pageSize: parseInt(query?.perPage as string) || 24,
						siblingCount: 2,
					}}
				/>
			</div>
		</div>
	);
};

//TODO: add loading animation when anything is loading
const SortSelect: React.FunctionComponent = () => {
	const { query } = useRouter();

	const onSelection = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		const newSort = e.target.value;

		Router.push({
			pathname: Router.pathname,
			query: { ...query, sort: newSort },
		});
	};

	return (
		<select required value={query.sort === undefined ? 'newest' : query.sort} onChange={onSelection}>
			<option value="newest">Newest</option>
			<option value="priceDescending">Price: High to Low</option>
			<option value="priceAscending">Price: Low to High</option>
		</select>
	);
};

const ProductListItem: React.FunctionComponent<ProductListItemProps> = ({ product }) => {
	const { name, handle, price, images } = product;

	return (
		<article className={styles['product-grid-item']}>
			<Link href={`/shop/products/${handle}`}>
				<a>
					<div className={styles['image-container']}>
						<Image className={styles['image']} src={images[0]} alt="display image" width="1060" height="1260" layout="responsive" />
					</div>
					<div className={styles['product-details']}>
						<h4 className={styles['product-name-text']}>{name}</h4>
						<h5 className={styles['price-text']}>{toPriceString(price)}</h5>
					</div>
				</a>
			</Link>
		</article>
	);
};

const Sidebar: React.FunctionComponent<SidebarProps> = props => {
	return <></>;
};

const FilterDrawer: React.FunctionComponent<FilterDrawerProps> = ({
	categoryFilters,
	brandFilters,
	selectedCategories,
	selectedBrands,
	priceRange,
	setSelectedCategories,
	setSelectedBrands,
	setPriceRange,
	closeDrawer,
	refine,
	minPrice,
	maxPrice,
	clearFilters,
	isDrawerOpen,
}) => {
	const setIsSelectedValue = (section: Section, value: number, isSelectedValue: boolean) => {
		switch (section) {
			case 'category':
				if (isSelectedValue && !selectedCategories.includes(value)) {
					setSelectedCategories(selectedCategories.concat(value));
				} else if (!isSelectedValue) {
					setSelectedCategories(selectedCategories.filter(c => c !== value));
				}
				break;

			case 'brand':
				if (isSelectedValue && !selectedBrands.includes(value)) {
					setSelectedBrands(selectedBrands.concat(value));
				} else if (!isSelectedValue) {
					setSelectedBrands(selectedBrands.filter(c => c !== value));
				}
				break;
			default:
				break;
		}
	};

	const resetSelection = useCallback(() => {
		const categoryQuery = Router.query.category as string;
		if (categoryQuery && typeof categoryQuery === 'string') {
			setSelectedCategories(categoryQuery.split(',').map(a => parseInt(a)) as number[]);
		} else {
			setSelectedCategories([]);
		}

		const brandQuery = Router.query.brand as string;
		if (brandQuery && typeof brandQuery === 'string') {
			setSelectedBrands(brandQuery.split(',').map(a => parseInt(a)) as number[]);
		} else {
			setSelectedBrands([]);
		}

		const prQuery = Router.query.priceRange as string;
		if (prQuery && typeof prQuery === 'string') {
			setPriceRange(prQuery.split(',').map(a => parseInt(a)) as number[]);
		}
	}, [setPriceRange, setSelectedBrands, setSelectedCategories]);

	useEffect(() => {
		if (!isDrawerOpen) {
			resetSelection();
		}
	}, [isDrawerOpen, resetSelection]);

	return (
		<>
			<div className={styles['fd-header']}>
				<span className={styles['fd-close']} onClick={e => closeDrawer(e)}>
					<CgClose />
				</span>
				<h2 className={styles['fd-title']}>Filter</h2>
			</div>
			<div className={styles['fd-content']}>
				<div>
					{(selectedBrands.length || selectedCategories.length || priceRange[0] !== 0 || priceRange[1] !== 10000) && (
						<div className={styles['fd-clear']}>
							<p onClick={clearFilters}>Clear Filters</p>
						</div>
					)}
				</div>
				{Router.query.collection === 'new' && (
					<div>
						<FilterSection
							checkboxProps={categoryFilters.map(c => {
								return {
									label: c.name,
									value: c.id,
									section: 'category' as Section,
									setIsSelectedValue,
									checked: selectedCategories.includes(c.id),
								};
							})}
							label={'Category'}
							isDrawerOpen={isDrawerOpen}
						/>
					</div>
				)}
				<div>
					<FilterSection
						checkboxProps={brandFilters.map(c => {
							return {
								label: c.name,
								value: c.id,
								section: 'brand' as Section,
								setIsSelectedValue,
								checked: selectedBrands.includes(c.id),
							};
						})}
						label={'Brand'}
						isDrawerOpen={isDrawerOpen}
					/>
				</div>
				<div>
					<FilterPriceSection {...{ priceRange, setPriceRange, minPrice, maxPrice, label: 'Price', isDrawerOpen }} />
				</div>
				<button
					className={styles['apply-button']}
					onClick={async e => {
						if (await refine(selectedCategories, selectedBrands, priceRange)) {
							closeDrawer(e);
						}
					}}
				>
					Apply
				</button>
			</div>
		</>
	);
};

const FilterSection: React.FunctionComponent<FilterSectionProps> = ({ checkboxProps, label, isDrawerOpen }) => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (!isDrawerOpen) {
			setIsOpen(false);
		}
	}, [isDrawerOpen]);

	const toggleExpand = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div
			className={`${styles['fd-section-container']} ${styles['expandable']} ${isOpen && styles['expanded']}`}
			style={
				isOpen ? { maxHeight: `${50 * checkboxProps.length}px`, transition: `max-height ${0.1 * (checkboxProps.length / 4)}s ease-out` } : {}
			}
		>
			<div className={`${styles['fd-section']}`} onClick={toggleExpand}>
				{label}
				<span className={styles['chevron']}>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
			</div>
			<ul>
				{checkboxProps.map(props => {
					return <FilterCheckboxInput key={`${props.section}_${props.value}`} {...props} />;
				})}
			</ul>
		</div>
	);
};

const FilterPriceSection: React.FunctionComponent<FilterPriceSectionProps> = ({
	priceRange,
	setPriceRange,
	minPrice,
	maxPrice,
	label,
	isDrawerOpen,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const STEP = 500;
	const MIN = minPrice;
	const MAX = maxPrice;

	useEffect(() => {
		if (!isDrawerOpen) {
			setIsOpen(false);
		}
	}, [isDrawerOpen]);

	const toggleExpand = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div
			className={`${styles['fd-section-container']} ${styles['expandable']} ${isOpen && styles['expanded']}`}
			style={isOpen ? { maxHeight: `150px`, transition: `max-height 0.2s ease-out` } : {}}
		>
			<div className={`${styles['fd-section']}`} onClick={toggleExpand}>
				{label}
				<span className={styles['chevron']}>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
			</div>
			<div className={styles['pf-container']}>
				<output className={styles['pf-output']}>
					<div className={styles['pf-min']}>{toPriceString(priceRange[0])}</div>
					<div className={styles['pf-max']}>{toPriceString(priceRange[1])}</div>
				</output>
				<div className={styles['pf-slider']}>
					<RangeSlider values={priceRange} setValues={setPriceRange} step={STEP} min={MIN} max={MAX} />
				</div>
			</div>
		</div>
	);
};

const SortDrawer: React.FunctionComponent<SortDrawerProps> = ({ closeDrawer }) => {
	const { query } = useRouter();

	return (
		<>
			<div className={styles['fd-header']}>
				<span className={styles['fd-close']} onClick={e => closeDrawer(e)}>
					<CgClose />
				</span>
				<h2 className={styles['fd-title']}>Sort</h2>
			</div>
			<div className={styles['fd-content']}>
				<div
					className={`${styles['sort-option-container']} ${(!query.sort || query.sort === 'newest') && styles['selected']}`}
					id="newest"
					onClick={e => {
						Router.push({
							pathname: Router.pathname,
							query: { ...query, sort: 'newest' },
						});
						closeDrawer(e);
					}}
				>
					<p>Newest</p>
				</div>
				<div
					className={`${styles['sort-option-container']} ${query.sort === 'priceDescending' && styles['selected']}`}
					id="priceDescending"
					onClick={e => {
						Router.push({
							pathname: Router.pathname,
							query: { ...query, sort: 'priceDescending' },
						});
						closeDrawer(e);
					}}
				>
					<p>Price: High to Low</p>
				</div>
				<div
					className={`${styles['sort-option-container']} ${query.sort === 'priceAscending' && styles['selected']}`}
					id="priceAscending"
					onClick={e => {
						Router.push({
							pathname: Router.pathname,
							query: { ...query, sort: 'priceAscending' },
						});
						closeDrawer(e);
					}}
				>
					<p>Price: Low to High</p>
				</div>
			</div>
		</>
	);
};

const FilterCheckboxInput: React.FunctionComponent<FilterCheckboxInputProps> = ({ section, label, value, setIsSelectedValue, checked }) => {
	return (
		<div
			className={styles['checkbox-container']}
			id={`${section}_${value}`}
			onClick={() => {
				setIsSelectedValue(section, value, !checked);
			}}
		>
			<p className={`${checked && styles['checkbox-label-checked']}`}>{label}</p>
			{checked && (
				<div className={styles['checkmark']} id={`${section}_${value}`}>
					<FiCheck />
				</div>
			)}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const { page, perPage, priceRange, sort, collection } = context.query as { [key: string]: string };

	if (!Object.keys(collections).includes(collection)) {
		return {
			notFound: true,
			props: {},
		};
	}

	const categories: number[] =
		decodeURIComponent(context.query.category as string)
			.split(',')
			.map(c => parseInt(c)) || [];

	const brands: number[] =
		decodeURIComponent(context.query.brand as string)
			.split(',')
			.map(c => parseInt(c)) || [];

	const categoryFilters = await prisma.category.findMany({
		orderBy: { id: 'asc' },
		select: { id: true, name: true },
	});
	const brandFilters = await prisma.brand.findMany({
		orderBy: { id: 'asc' },
		select: { id: true, name: true },
	});

	let currentCategories = categoryFilters.filter(c => categories.includes(c.id));
	const currentBrands = brandFilters.filter(b => brands.includes(b.id));

	if (collection !== 'new' && !currentCategories.find(c => c.name.toLowerCase() === collection)) {
		const c = await prisma.category.findUnique({
			where: { nameLower: collection },
		});

		if (c) {
			currentCategories.push(c);
		}
	}
	const currentPriceRange: number[] = priceRange
		? decodeURIComponent(priceRange)
				.split(',')
				.map(p => parseInt(p))
		: [0, 10000];
	const wherePriceIsWithinRange = [{ price: { gte: currentPriceRange[0] } }, { price: { lt: currentPriceRange[1] } }];

	// Get sidebar data
	// const productInPriceRangeExists = async (min: number, max: number): Promise<boolean> => {
	// 	return await prisma.product
	// 		.findFirst({
	// 			where: {
	// 				AND: [
	// 					...wherePriceIsWithinRange,
	// 					{
	// 						OR: [...currentBrands.map(b => ({ brandName: b.name.toLowerCase() }))],
	// 					},
	// 					{
	// 						OR: [...currentCategories.map(c => ({ categoryName: c.name.toLowerCase() }))],
	// 					},
	// 				],
	// 			},
	// 		})
	// 		.then(product => {
	// 			if (!product) {
	// 				return false;
	// 			}
	// 			return true;
	// 		});
	// };

	// Get product data
	const pageAsInt: number = (parseInt(page) <= 1 ? 1 : parseInt(page)) - 1 || 0;
	const perPageAsInt: number = parseInt(perPage) || 24;
	let orderByInput: Prisma.ProductOrderByWithRelationAndSearchRelevanceInput;

	switch (sort) {
		case 'newest':
			orderByInput = {
				createdAt: 'asc',
			};
			break;
		case 'priceDescending':
			orderByInput = {
				price: 'desc',
			};
			break;
		case 'priceAscending':
			orderByInput = {
				price: 'asc',
			};
			break;
		default:
			orderByInput = {
				createdAt: 'asc',
			};
			break;
	}

	const products: ProductBasic[] = await prisma.product
		.findMany({
			skip: pageAsInt * perPageAsInt,
			take: perPageAsInt,
			where: {
				AND: [
					...wherePriceIsWithinRange,
					{
						OR: [...currentBrands.map(b => ({ brandName: b.name.toLowerCase() }))],
					},
					{
						OR: [...currentCategories.map(c => ({ categoryName: c.name.toLowerCase() }))],
					},
				],
			},
			orderBy: orderByInput,
			select: {
				id: true,
				name: true,
				handle: true,
				price: true,
				images: true,
				quantity: true,
				brandName: true,
				categoryName: true,
			},
		})
		.then(products =>
			products.map(p => {
				return {
					id: p.id,
					name: p.name,
					handle: p.handle,
					price: parseInt(p.price.toString()),
					images: p.images,
					quantity: p.quantity,
					brand: p.brandName,
					category: p.categoryName,
				};
			})
		)
		.catch(err => {
			return [];
		});

	const productCount = await prisma.product
		.count({
			where: {
				AND: [
					...wherePriceIsWithinRange,
					{
						OR: [...currentBrands.map(b => ({ brandName: b.name.toLowerCase() }))],
					},
					{
						OR: [...currentCategories.map(c => ({ categoryName: c.name.toLowerCase() }))],
					},
				],
			},
			select: {
				_all: true,
			},
		})
		.then(results => results._all);

	return {
		notFound: false,
		props: {
			products,
			currentCategories,
			currentBrands,
			currentPriceRange,
			categoryFilters,
			brandFilters,
			productCount,
		},
	};
};

export default Shop;
