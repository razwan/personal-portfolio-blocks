import React, { Fragment } from "react";

export const OuterPolygon = ( { points, show } ) => {

	if ( ! show ) {
		return null;
	}

	return (
		points.map( ( point, index ) => {
			const nextPoint = points[ ( index + 1 ) % points.length ];
			return (
				<Fragment key={ 'point_' + index }>
					<line x1={ point.x } y1={ point.y } x2={ nextPoint.x } y2={ nextPoint.y } strokeWidth="0.05"
					      stroke="black" strokeDasharray="0.2" style={ { strokeOpacity: .5 } }/>
				</Fragment>
			)
		} )
	)
}
