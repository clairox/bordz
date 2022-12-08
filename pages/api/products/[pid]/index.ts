import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (prisma === undefined) return res.status(500).json(null);

	if (req.method === 'GET') {
		const { pid } = req.query as { [key: string]: string };

		const product = await prisma.product.findUnique({
			where: { id: parseInt(pid) },
		});

		if (product) {
			return res.status(200).json({ ...product, price: parseInt(product.price.toString()), salePrice: parseInt(product.salePrice.toString()) });
		}
		return res.status(400).json({});
	} else {
		return res.status(405).json(null);
	}
}
