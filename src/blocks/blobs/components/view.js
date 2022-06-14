import React, { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { useScrollY } from "../../../hooks";
import {
	BLOB_MAX_SIDES,
	getBoundsFromCurves,
	getCurvePointsFromPoints, getPathFromCurvePoints,
	getPointsArray,
	scaleCurvePoints,
	scalePoints
} from "../utils";

import {
	Blob,
	InitialCircle,
	InnerPolygon,
	MiddlePoints,
	MiddlePointsControls,
	OuterPolygon,
	Points,
	Radii,
} from '../components';

import { Controls } from './controls';
import { Preview } from './preview';

import { BlobsViewContext } from "../context";

export const View = () => {
	const [ showShape, setShowShape ] = useState( false );
	const [ showPoints, setShowPoints ] = useState( true );
	const [ showMiddlePoints, setShowMiddlePoints ] = useState( false );
	const [ showMiddlePointsControls, setShowMiddlePointsControls ] = useState( false );
	const [ showOuterPolygon, setShowOuterPolygon ] = useState( false );
	const [ showAll, setShowAll ] = useState( true );
	const [ seed, setSeed ] = useState(980 );
	const [ showRandomize, setShowRandomize ] = useState( false );
	const [ showInitialCircle, setShowInitialCircle ] = useState( true );
	const [ showRadii, setShowRadii ] = useState( true );
	const [ sides, setSides ] = useState( 5 );
	const [ smoothness, setSmoothness ] = useState( 100 );
	const [ complexity, setComplexity ] = useState( 90 );
	const [ showSmoothness, setShowSmoothness ] = useState( false );
	const [ showComplexity, setShowComplexity ] = useState( false );

	const y = useScrollY();

	const previewSmoothness = useMemo( () => {
		const start = 1750;
		const end = 2750;
		const progress = Math.max( 0, Math.min( 1, ( y - start ) / ( end - start ) ) )
		return smoothness * progress;
	}, [ y, smoothness ] );

	const previewComplexity = useMemo( () => {
		const start = 3000;
		const end = 4000;
		const progress = Math.max( 0, Math.min( 1, ( y - start ) / ( end - start ) ) )
		return complexity * progress;
	}, [ y, complexity ] );

	const scaleProgress = useMemo( () => {
		const start = 5000;
		const end = 6000;

		return Math.max( 0, Math.min( 1, ( y - start ) / ( end - start ) ) )
	}, [ y ] );

	const store = {
		showShape, setShowShape,
		showPoints, setShowPoints,
		showMiddlePoints, setShowMiddlePoints,
		showMiddlePointsControls, setShowMiddlePointsControls,
		showOuterPolygon, setShowOuterPolygon,
		showAll, setShowAll,
		seed, setSeed,
		showRandomize, setShowRandomize,
		showInitialCircle, setShowInitialCircle,
		showRadii, setShowRadii,
		sides, setSides,
		smoothness: previewSmoothness, setSmoothness,
		complexity: previewComplexity, setComplexity,
		scaleProgress,
		showSmoothness,
		showComplexity,
	};

	useEffect( () => {
		setShowOuterPolygon( y >= 500 && y < 1750 );
		setShowShape( y >= 1500 );
		setShowMiddlePoints( y >= 1000 && y < 4500 );
		setShowMiddlePointsControls( y >= 1000 && y < 4500 );
		setShowSmoothness( y > 2750 );
		setShowComplexity( y > 4000 );
		setShowRadii( y < 4500 );
		setShowPoints( y < 4500 );
		setShowInitialCircle( y < 5000 );
		setShowRandomize( y >= 6000 );
	}, [ y ] );

	return (
		<BlobsViewContext.Provider value={ store }>
			<Preview />
			<Controls />
		</BlobsViewContext.Provider>
	);
}
