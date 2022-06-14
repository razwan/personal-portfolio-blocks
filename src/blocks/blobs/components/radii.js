import React, { Fragment } from "react";
import { BLOB_RADIUS } from "../utils";

export const Radii = ( { points, show } ) => {
	if ( ! show ) {
		return null;
	}

	return (
		points.map( ( point, index ) => {
			return (
				<Fragment key={ 'point_' + index }>
					<line x1={ point.x } y1={ point.y } x2={ BLOB_RADIUS } y2={ BLOB_RADIUS } strokeWidth="0.05"
					      stroke="black" strokeDasharray="0.2" style={ { strokeOpacity: .5 } }/>
				</Fragment>
			)
		} )
	)
}
