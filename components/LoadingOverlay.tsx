import React from 'react';
import styles from '../styles/Overlay.module.css';

const LoadingOverlay = () => {
	return <div className={`${styles['overlay']} ${styles['light']} ${styles['loading']}`}></div>;
};

export default LoadingOverlay;
