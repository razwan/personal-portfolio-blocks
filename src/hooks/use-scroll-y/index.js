import { useCallback, useEffect, useState } from "react";

export const useScrollY = () => {
	const [ y, setY ] = useState( window.scrollY );

	const onScroll = useCallback( () => {
		setY( window.scrollY );
	}, [] );

	useEffect( function() {
		window.addEventListener( 'scroll', onScroll );

		return function() {
			window.removeEventListener( 'scroll', onScroll );
		};
	}, [ onScroll ] );

	return y;
}