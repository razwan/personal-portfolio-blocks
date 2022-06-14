import React, { Fragment } from "react";

export const Points = ( { points, show } ) => {
	if ( ! show ) {
		return null;
	}

	return (
		points.map( ( point, index ) => {
			return (
				<Fragment key={'point_' + index}>
					<rect x={ point.x - 0.2 } y={ point.y - 0.2 } width="0.4" height="0.4" stroke="black" strokeWidth="0.05"  fill="yellow" />
				</Fragment>
			)
		} )
	)
}
