import { animated, useSpring } from "react-spring";
import React from "react";

export const Blob = ( { path, isAnimated, show } ) => {

	const spring = useSpring( {
		to: { path },
		immediate: ! isAnimated
	} );

	if ( ! show ) {
		return null;
	}

	return (
		<animated.path d={ spring.path } fill={ "#EEEEEE" } stroke={ "#000000" } strokeWidth="0.05" />
	)
}
