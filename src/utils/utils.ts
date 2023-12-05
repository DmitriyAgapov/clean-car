import React from "react";

export const useOutsideClick = (callback: () => void) => {
	const ref = React.useRef(null);

	React.useEffect(() => {
		const handleClick = (event: { target: any; }) => {
			// @ts-ignore
			if (ref.current && !ref.current.contains(event.target)) {

				callback();
			}
		};

		document.addEventListener('click', handleClick, true);

		return () => {
			document.removeEventListener('click', handleClick, true);
		};
	}, [ref]);

	return ref;
};
