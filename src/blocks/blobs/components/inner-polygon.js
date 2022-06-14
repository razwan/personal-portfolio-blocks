import React, { Fragment } from "react";

export const InnerPolygon = ( { curvePoints } ) =>{
	return (
		curvePoints.map( ( curvePoint, index ) => {
			const nextCurvePoint = curvePoints[ ( index + 1 ) % curvePoints.length ];
			return (
				<Fragment key={'curve_point3_' + index}>
					<line x1={ curvePoint.m1x } y1={ curvePoint.m1y } x2={ nextCurvePoint.m1x } y2={ nextCurvePoint.m1y } strokeWidth="0.05" stroke="black" strokeDasharray="0.2" style={ { strokeOpacity: .5 } } />
				</Fragment>
			)
		} )
	);
}
