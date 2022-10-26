import { MutableRefObject, SyntheticEvent, DOMAttributes, useCallback, useEffect, useMemo, useRef, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from '../styles/Drawer.module.css';

type HTMLElRef = MutableRefObject<HTMLElement>;

type CustomEvent = {
	event?: SyntheticEvent<any, Event>;
	drawer: HTMLElRef;
	targetEl: HTMLElRef;
} & SyntheticEvent<any, Event>;

export type CustomEventHandler = (customEvent: CustomEvent) => void;
type CustomEventHandlers = {
	[K in keyof DOMAttributes<K>]?: CustomEventHandler;
};

type EventListenerMap = { [K in keyof DOMAttributes<K>]: keyof GlobalEventHandlersEventMap };
type EventListenersRef = MutableRefObject<{
	[K in keyof DOMAttributes<K>]?: (event: SyntheticEvent<any, Event>) => void;
}>;

export type UseDrawerOptions = {
	id?: string;
	fullScreen?: boolean;
	padded?: boolean;
	side?: 'left' | 'right';
	closeOnOutsideClick?: boolean;
	closeOnEsc?: boolean;
	bindTo?: HTMLElement; // attach the drawer to this node in the DOM
	isOpen?: boolean;
	onOpen?: CustomEventHandler;
	onClose?: CustomEventHandler;
	onDrawerClick?: CustomEventHandler;
} & CustomEventHandlers;

export const errorMessage1 =
	'You must either add a `ref` to the element you are interacting with or pass an `event` to openDrawer(e) or toggleDrawer(e)';

const useDrawer = ({
	id,
	fullScreen = false,
	padded = true,
	side,
	closeOnOutsideClick = true,
	closeOnEsc = true,
	bindTo,
	isOpen: defaultIsOpen = false,
	onOpen,
	onClose,
	onDrawerClick,
	...eventHandlers
}: UseDrawerOptions = {}) => {
	const [isOpen, makeOpen] = useState(defaultIsOpen);

	// we use this ref because `isOpen` is stale for handleOutsideMouseClick
	const open = useRef(isOpen);

	// workaround to not have stale `isOpen` in the handleOutsideMouseClick
	const setOpen = useCallback((v: boolean) => {
		open.current = v;
		makeOpen(v);
	}, []);

	const targetEl = useRef() as HTMLElRef; // this is the element you are clicking/hovering/whatever, to trigger opening the drawer
	const drawer = useRef() as HTMLElRef;

	useEffect(() => {
		if (!drawer.current) {
			drawer.current = document.createElement('div');
			drawer.current.classList.add(styles['drawer']);
			fullScreen && drawer.current.classList.add(styles['full-screen']);
			padded && drawer.current.classList.add(styles['padded']);
			side === 'left' && drawer.current.classList.add(styles['left']);
			side === 'right' && drawer.current.classList.add(styles['right']);
		}
	}, [fullScreen, padded, side]);

	const elToMountTo = useMemo(() => {
		return (bindTo && bindTo) || (typeof document !== 'undefined' && document.body);
	}, [bindTo]);

	const createCustomEvent = (e: any) => {
		if (!e) {
			return { drawer, targetEl, event: e };
		}

		const event = e || {};

		if (event.persist) {
			event.persist();
		}

		event.drawer = drawer;
		event.targetEl = targetEl;
		event.event = e;

		const { currentTarget } = e;
		if (!targetEl.current && currentTarget && currentTarget !== document) {
			targetEl.current = event.currentTarget;
		}
		return event;
	};

	// this should handle all eventHandlers like onClick, onMouseOver, etc. passed into the config
	const customEventHandlers: CustomEventHandlers = Object.entries(eventHandlers).reduce<any>((acc, [handlerName, eventHandler]) => {
		acc[handlerName] = (event?: SyntheticEvent<any, Event>) => {
			eventHandler(createCustomEvent(event));
		};
		return acc;
	}, {});

	const openDrawer = useCallback(
		(e: any) => {
			const customEvent = createCustomEvent(e);

			// for some reason, when we don't have the event argument, there
			// is a weird race condition. Would like to see if we can remove
			// setTimeout, but for now this works
			if (targetEl.current == null) {
				setTimeout(() => setOpen(true), 0);
				throw Error(errorMessage1);
			}

			if (onOpen) {
				onOpen(customEvent);
			}
			drawer.current.classList.add(styles['drawer-open']);
			document.getElementById('main-layout')!.classList.add(styles['no-scroll']);
			setOpen(true);
		},
		[setOpen, targetEl, onOpen]
	);

	const closeDrawer = useCallback(
		(e: any) => {
			const customEvent = createCustomEvent(e);

			if (onClose && open.current) {
				onClose(customEvent);
			}

			if (open.current) {
				drawer.current.classList.remove(styles['drawer-open']);
				document.getElementById('main-layout')!.classList.remove(styles['no-scroll']);
				setOpen(false);
			}
		},
		[onClose, setOpen]
	);

	const toggleDrawer = useCallback(
		(e: SyntheticEvent<any, Event>): void => {
			return open.current ? closeDrawer(e) : openDrawer(e);
		},
		[closeDrawer, openDrawer]
	);

	const handleKeydown = useCallback(
		(e: KeyboardEvent): void => {
			return e.key === 'Escape' && closeOnEsc ? closeDrawer(e) : undefined;
		},
		[closeOnEsc, closeDrawer]
	);

	const handleOutsideMouseClick = useCallback(
		(e: MouseEvent): void => {
			const containsTarget = (target: HTMLElRef) => target.current.contains(e.target as HTMLElement);
			if (containsTarget(drawer) || (e as any).button !== 0 || !open.current || containsTarget(targetEl)) {
				return;
			}

			if (closeOnOutsideClick) {
				closeDrawer(e);
			}
		},
		[closeDrawer, closeOnOutsideClick, drawer]
	);

	const handleMouseDown = useCallback(
		(e: MouseEvent): void => {
			if (!(drawer.current instanceof HTMLElement)) {
				return;
			}

			const customEvent = createCustomEvent(e);
			if (drawer.current.contains(customEvent.target as HTMLElement) && onDrawerClick) {
				onDrawerClick(customEvent);
			}

			handleOutsideMouseClick(e);
		},
		[handleOutsideMouseClick, onDrawerClick]
	);

	// used to remove the event listeners on unmount
	const eventListeners = useRef({}) as EventListenersRef;

	useEffect(() => {
		if (!id || !(elToMountTo instanceof HTMLElement) || !(drawer.current instanceof HTMLElement)) return;

		if (drawer.current.id === id) return;

		drawer.current.id = id;

		const eventHandlerMap: EventListenerMap = {
			onScroll: 'scroll',
			onWheel: 'wheel',
		};

		elToMountTo.appendChild(drawer.current);
		// handles all special case handlers. Currently only onScroll and onWheel
		Object.entries(eventHandlerMap).forEach(([handlerName, eventListenerName]) => {
			if (!eventHandlers[handlerName as keyof EventListenerMap]) {
				return;
			}

			eventListeners.current[handlerName as keyof EventListenerMap] = (e: any) =>
				(eventHandlers[handlerName as keyof EventListenerMap] as any)(createCustomEvent(e));
			document.addEventListener(
				eventListenerName as keyof GlobalEventHandlersEventMap,
				eventListeners.current[handlerName as keyof EventListenerMap] as any
			);
		});

		document.addEventListener('keydown', handleKeydown);
		document.addEventListener('mousedown', handleMouseDown as any);
	}, [handleOutsideMouseClick, handleKeydown, handleMouseDown, eventHandlers, elToMountTo, drawer, id]);

	const Drawer = useCallback(
		({ children }: { children: ReactNode }) => {
			if (drawer.current != null) {
				return createPortal(children, drawer.current);
			}

			return null;
		},
		[drawer]
	);

	return Object.assign([openDrawer, closeDrawer, open.current, Drawer, toggleDrawer, targetEl, drawer], {
		isOpen: open.current,
		openDrawer,
		ref: targetEl,
		closeDrawer,
		toggleDrawer,
		Drawer,
		drawerRef: drawer,
		...customEventHandlers,
		bind: {
			// used if you want to spread all html attributes onto the target element
			ref: targetEl,
			...customEventHandlers,
		},
	});
};

export default useDrawer;
