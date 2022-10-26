import { useMemo } from 'react';

export const usePagination = ({
	totalCount,
	pageSize,
	siblingCount = 1,
	currentPage,
}: {
	totalCount: number;
	pageSize: number;
	siblingCount: number;
	currentPage: number;
}) => {
	const paginationRange = useMemo(() => {
		const totalPageCount = Math.ceil(totalCount / pageSize);

		const range = (start: number, end: number) => {
			let length = end - start + 1;
			return Array.from({ length }, (_, idx) => idx + start);
		};

		const totalPageNumbers = siblingCount + 1;

		if (totalPageNumbers >= totalPageCount) {
			return range(1, totalPageCount);
		}

		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
		const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

		const shouldTruncateLeft = leftSiblingIndex >= siblingCount;
		const shouldTruncateRight = rightSiblingIndex < totalPageCount;

		if (!shouldTruncateLeft && shouldTruncateRight) {
			return range(1, rightSiblingIndex);
		}

		if (shouldTruncateLeft && !shouldTruncateRight) {
			return range(leftSiblingIndex, totalPageCount);
		}

		if (shouldTruncateLeft && shouldTruncateRight) {
			return range(leftSiblingIndex, rightSiblingIndex);
		}

		return range(1, totalPageCount);
	}, [totalCount, pageSize, siblingCount, currentPage]);

	return paginationRange;
};
