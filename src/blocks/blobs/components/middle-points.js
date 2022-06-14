import React, { Fragment } from "react";

export const MiddlePoints = ( { curvePoints, show } ) => {
	if ( ! show ) {
		return null;
	}

	return (
		curvePoints.map( ( { x1, y1, x2, y2, m1x, m1y, m2x, m2y }, index ) => {
			return (
				<Fragment key={'curve_point3_' + index}>
					<rect x={ m1x - 0.2 } y={ m1y - 0.2 } width="0.4" height="0.4" stroke="black" strokeWidth="0.05"  fill="yellow" />
				</Fragment>
			)
		} )
	)
}
