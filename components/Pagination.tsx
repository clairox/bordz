import { usePagination } from '../lib/usePagination';
import pageStyles from '../styles/Pagination.module.css';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

interface PaginationProps {
	onPageChange: (page: number) => void;
	totalCount: number;
	currentPage: number;
	pageSize: number;
	siblingCount: number;
}

const Pagination: React.FunctionComponent<PaginationProps> = ({ onPageChange, totalCount, currentPage, pageSize, siblingCount }) => {
	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	if (currentPage === 0) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange![paginationRange!.length - 1];
	return (
		<div id={pageStyles.layout}>
			<div>
				{currentPage > 1 && (
					<button aria-label="Previous Page" className={pageStyles['button'] + ' ' + pageStyles['button-previous']} onClick={onPrevious}>
						<MdArrowBackIos />
					</button>
				)}
			</div>
			{paginationRange?.map(pageNumber => {
				if (currentPage === pageNumber) {
					return (
						<div
							className={pageStyles.pageNumber}
							style={{ backgroundColor: 'rgb(0, 189, 223)', color: 'white', fontWeight: 'bold', borderColor: 'var(--primary-color)' }}
							key={pageNumber}
						>
							{pageNumber}
						</div>
					);
				}
				return (
					<div className={pageStyles.pageNumber} key={pageNumber} onClick={() => onPageChange(pageNumber)}>
						{pageNumber}
					</div>
				);
			})}
			<div>
				{currentPage < lastPage && (
					<button
						aria-label="Next Page"
						className={pageStyles['button'] + ' ' + pageStyles['button-next']}
						onClick={onNext}
						disabled={currentPage >= lastPage}
					>
						<MdArrowForwardIos />
					</button>
				)}
			</div>
		</div>
	);
};

export default Pagination;
