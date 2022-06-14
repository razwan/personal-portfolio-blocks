import { BLOB_RADIUS } from "../utils";
import React from "react";

export const InitialCircle = ( { show } ) => {

	if ( ! show ) {
		return null;
	}

	return (
		<circle cx={ BLOB_RADIUS } cy={ BLOB_RADIUS } r={ BLOB_RADIUS } fill="none" strokeWidth="0.05" stroke="black" strokeDasharray="0.2" style={ { strokeOpacity: .5 } } />
	)
}
