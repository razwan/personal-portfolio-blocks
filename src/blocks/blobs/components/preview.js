import React, { useContext } from "react";
import { BlobsViewContext } from "../context";

import {
	BLOB_MAX_SIDES,
	getBoundsFromCurves,
	getCurvePointsFromPoints,
	getPathFromCurvePoints,
	getPointsArray,
	scaleCurvePoints,
	scalePoints
} from "../utils";

import { InitialCircle } from "./initial-circle";
import { OuterPolygon } from "./outer-polygon";
import { Blob } from "./blob";
import { Radii } from "./radii";
import { Points } from "./points";
import { MiddlePointsControls } from "./middle-points-controls";
import { MiddlePoints } from "./middle-points";

export const Preview = () => {
	const store = useContext( BlobsViewContext );

	const {
		scaleProgress,
		seed,
		sides,
		showAll,
		showInitialCircle,
		showMiddlePoints,
		showMiddlePointsControls,
		showOuterPolygon,
		showPoints,
		showRandomize,
		showRadii,
		showShape,

		smoothness,
		complexity,
	} = store;

	const attributes = {
		sides: sides,
		smoothness,
		complexity,
		patternSeed: seed
	}

	const points = getPointsArray( attributes );
	const offsetPoints = getPointsArray( { ...attributes, complexity: 0 } );
	const curvePoints = getCurvePointsFromPoints( attributes );
	const bounds = getBoundsFromCurves( curvePoints );

	scalePoints( points, bounds, scaleProgress );
	scalePoints( offsetPoints, bounds, scaleProgress );
	scaleCurvePoints( curvePoints, bounds, scaleProgress );

	const missingPoints = BLOB_MAX_SIDES - sides;
	const path = getPathFromCurvePoints( curvePoints, missingPoints );

	return (
		<svg viewBox="-1 -1 22 22">
			<InitialCircle show={ showInitialCircle } />
			<OuterPolygon points={ points } show={ showAll && showOuterPolygon } />
			<Blob path={ path } show={ showShape } isAnimated={ showRandomize } />
			<Radii points={ offsetPoints } show={ showAll && showRadii } />
			<Points points={ points } show={ showAll && showPoints } />
			<MiddlePointsControls curvePoints={ curvePoints } show={ showAll && showMiddlePointsControls } />
			<MiddlePoints curvePoints={ curvePoints } show={ showAll && showMiddlePoints } />
		</svg>
	)
};