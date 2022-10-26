import { MutableRefObject, SyntheticEvent, DOMAttributes, useCallback, useEffect, useMemo, useRef, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

type HTMLElRef = MutableRefObject<HTMLElement>;

type CustomEvent = {
	event?: SyntheticEvent<any, Event>;
	portal: HTMLElRef;
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

export type UsePortalOptions = {
	closeOnOutsideClick?: boolean;
	closeOnEsc?: boolean;
	bindTo?: HTMLElement; // attach the portal to this node in the DOM
	isOpen?: boolean;
	onOpen?: CustomEventHandler;
	onClose?: CustomEventHandler;
	onPortalClick?: CustomEventHandler;
} & CustomEventHandlers;

export const errorMessage1 =
	'You must either add a `ref` to the element you are interacting with or pass an `event` to openPortal(e) or togglePortal(e)';

const usePortal = ({
	closeOnOutsideClick = true,
	closeOnEsc = true,
	bindTo,
	isOpen: defaultIsOpen = false,
	onOpen,
	onClose,
	onPortalClick,
	...eventHandlers
}: UsePortalOptions = {}) => {
	const [isOpen, makeOpen] = useState(defaultIsOpen);

	// we use this ref because `isOpen` is stale for handleOutsideMouseClick
	const open = useRef(isOpen);

	// workaround to not have stale `isOpen` in the handleOutsideMouseClick
	const setOpen = useCallback((v: boolean) => {
		open.current = v;
		makeOpen(v);
	}, []);

	const targetEl = useRef() as HTMLElRef; // this is the element you are clicking/hovering/whatever, to trigger opening the portal
	const portal = useRef(typeof document !== 'undefined' ? document.createElement('div') : null) as HTMLElRef;

	useEffect(() => {
		if (!portal.current) {
			portal.current = document.createElement('div');
		}
	}, [portal]);

	const elToMountTo = useMemo(() => {
		return (bindTo && bindTo) || (typeof document !== 'undefined' && document.body);
	}, [bindTo]);

	const createCustomEvent = (e: any) => {
		if (!e) {
			return { portal, targetEl, event: e };
		}

		const event = e || {};

		if (event.persist) {
			event.persist();
		}

		event.portal = portal;
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

	const openPortal = useCallback(
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
			setOpen(true);
		},
		[setOpen, targetEl, onOpen]
	);

	const closePortal = useCallback(
		(e: any) => {
			const customEvent = createCustomEvent(e);

			if (onClose && open.current) {
				onClose(customEvent);
			}

			if (open.current) {
				setOpen(false);
			}
		},
		[onClose, setOpen]
	);

	const togglePortal = useCallback(
		(e: SyntheticEvent<any, Event>): void => {
			return open.current ? closePortal(e) : openPortal(e);
		},
		[closePortal, openPortal]
	);

	const handleKeydown = useCallback(
		(e: KeyboardEvent): void => {
			return e.key === 'Escape' && closeOnEsc ? closePortal(e) : undefined;
		},
		[closeOnEsc, closePortal]
	);

	const handleOutsideMouseClick = useCallback(
		(e: MouseEvent): void => {
			const containsTarget = (target: HTMLElRef) => target.current.contains(e.target as HTMLElement);
			if (containsTarget(portal) || (e as any).button !== 0 || !open.current || containsTarget(targetEl)) {
				return;
			}

			if (closeOnOutsideClick) {
				closePortal(e);
			}
		},
		[closePortal, closeOnOutsideClick, portal]
	);

	const handleMouseDown = useCallback(
		(e: MouseEvent): void => {
			if (!(portal.current instanceof HTMLElement)) {
				return;
			}

			const customEvent = createCustomEvent(e);
			if (portal.current.contains(customEvent.target as HTMLElement) && onPortalClick) {
				onPortalClick(customEvent);
			}

			handleOutsideMouseClick(e);
		},
		[handleOutsideMouseClick, onPortalClick]
	);

	// used to remove the event listeners on unmount
	const eventListeners = useRef({}) as EventListenersRef;

	useEffect(() => {
		if (!(elToMountTo instanceof HTMLElement) || !(portal.current instanceof HTMLElement)) return;

		const eventHandlerMap: EventListenerMap = {
			onScroll: 'scroll',
			onWheel: 'wheel',
		};

		const node = portal.current;
		elToMountTo.appendChild(portal.current);
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

		return () => {
			// handles all special case handlers. Currently only onScroll and onWheel
			Object.entries(eventHandlerMap).forEach(([handlerName, eventListenerName]) => {
				if (!eventHandlers[handlerName as keyof EventListenerMap]) {
					return;
				}
			});
			document.removeEventListener('keydown', handleKeydown);
			document.removeEventListener('mousedown', handleMouseDown as any);
			elToMountTo.removeChild(node);
		};
	}, [handleOutsideMouseClick, handleKeydown, handleMouseDown, eventHandlers, elToMountTo, portal]);

	const Portal = useCallback(
		({ children }: { children: ReactNode }) => {
			if (portal.current != null) {
				return createPortal(children, portal.current);
			}

			return null;
		},
		[portal]
	);

	return Object.assign([openPortal, closePortal, open.current, Portal, togglePortal, targetEl, portal], {
		isOpen: open.current,
		openPortal,
		ref: targetEl,
		closePortal,
		togglePortal,
		Portal,
		portalRef: portal,
		...customEventHandlers,
		bind: {
			// used if you want to spread all html attributes onto the target element
			ref: targetEl,
			...customEventHandlers,
		},
	});
};

export default usePortal;
