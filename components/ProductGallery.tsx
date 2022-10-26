import Image from 'next/image';
import React from 'react';
import styles from '../styles/ProductGallery.module.css';

type ProductGalleryProps = {
	images: string[];
};

const ProductGallery: React.FunctionComponent<ProductGalleryProps> = ({ images }) => {
	return (
		<section className={styles['gallery-container']}>
			<div id={styles['gallery-slider']}>
				{images.map((img, idx) => {
					return (
						<div key={idx} className={styles['gallery-image']}>
							<Image src={img} alt="product image" width="720px" height="856px" />
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default ProductGallery;
