import React from 'react';
import styles from '../styles/Overlay.module.css';

const ContentOverlay = () => {
	return <div className={`${styles['overlay']} ${styles['content']}`}></div>;
};

export default ContentOverlay;
