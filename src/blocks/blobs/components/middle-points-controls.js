import React, { Fragment } from "react";

export const MiddlePointsControls = ( { curvePoints, show } ) => {

	if ( ! show ) {
		return null;
	}

	return (
		<Fragment>
			{ curvePoints.map( ( { x1, y1, x2, y2, m1x, m1y, m2x, m2y }, index ) => {
				return (
					<Fragment key={ 'curve_point1_' + index }>
						<line x1={ m1x } y1={ m1y } x2={ x1 } y2={ y1 } strokeWidth="0.05" stroke="black"/>
						<line x1={ m2x } y1={ m2y } x2={ x2 } y2={ y2 } strokeWidth="0.05" stroke="black"/>
					</Fragment>
				)
			} ) }
			{ curvePoints.map( ( { x1, y1, x2, y2, m1x, m1y, m2x, m2y }, index ) => {
				return (
					<Fragment key={ 'curve_point2_' + index }>
						<circle cx={ x1 } cy={ y1 } r="0.2" stroke="black" strokeWidth="0.05" fill="white"/>
						<circle cx={ x2 } cy={ y2 } r="0.2" stroke="black" strokeWidth="0.05" fill="white"/>
					</Fragment>
				)
			} ) }
		</Fragment>
	)
}
