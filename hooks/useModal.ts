import usePortal from './usePortal';
import styles from '../styles/Modal.module.css';

const useModal = () => {
	const { isOpen, openPortal, togglePortal, closePortal, Portal } = usePortal({
		onOpen({ portal }) {
			if (typeof document !== 'undefined') {
				document.getElementById('main-layout')!.classList.add(styles['no-scroll']);
			}
			portal.current.classList.add(styles['container']);
		},
		onClose({ portal }) {
			document.getElementById('main-layout')!.classList.remove(styles['no-scroll']);
			portal.current.classList.remove(styles['container']);
		},
		closeOnEsc: false,
	});

	return {
		Modal: Portal,
		openModal: openPortal,
		toggleModal: togglePortal,
		closeModal: closePortal,
		isOpen,
	};
};

export default useModal;
