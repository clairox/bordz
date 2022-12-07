import prisma from '../../../lib/prisma';
import { Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import toPriceString from '../../../lib/toPriceString';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (prisma === undefined) return res.status(500).json(null);
	if (req.method !== 'GET') return res.status(405).json(null);

	const { page, perPage, brand, category, sort } = req.query as { [key: string]: string };
	const pageAsInt: number = (parseInt(page) <= 1 ? 1 : parseInt(page)) - 1 || 0;
	const perPageAsInt: number = parseInt(perPage) || 24;

	let orderByInput: Prisma.ProductOrderByWithAggregationInput;

	switch (sort) {
		case 'newest':
			orderByInput = {
				createdAt: 'asc',
			};
			break;
		case 'priceDescending':
			orderByInput = {
				salePrice: 'desc',
			};
			break;
		case 'priceAscending':
			orderByInput = {
				salePrice: 'asc',
			};
			break;
		default:
			orderByInput = {
				createdAt: 'asc',
			};
			break;
	}

	await prisma.product
		.findMany({
			skip: pageAsInt * perPageAsInt,
			take: perPageAsInt,
			where: {
				AND: [{ brandName: brand }, { categoryName: category }],
			},
			orderBy: orderByInput,
			select: {
				id: true,
				name: true,
				handle: true,
				price: true,
				salePrice: true,
				images: true,
				quantity: true,
				createdAt: true,
				brandName: true,
				categoryName: true,
			},
		})
		.then(products => {
			return res.status(200).json(products.map(p => ({ ...p, price: toPriceString(p.price), salePrice: toPriceString(p.salePrice) })));
		})
		.catch(err => {
			console.error(err);
			return res.status(500).json(null);
		});
}
