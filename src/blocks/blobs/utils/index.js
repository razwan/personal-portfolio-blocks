import { MersenneTwister } from "fast-mersenne-twister";
import { getBoundsOfCurve } from "./get-bounds-of-curve";

export const BLOB_MAX_SIDES = 12;
export const BLOB_RADIUS = 10;

export { getBoundsOfCurve }

export const getRatioArray = ( sides, patternSeed ) => {
	const pseudoRandomGenerator = MersenneTwister( patternSeed );
	const ratioArray = Array.from(Array(sides).keys()).map(() => {
		const options = {min: 1, max: 10};

		return (Math.floor(pseudoRandomGenerator.random() * (options.max - options.min + 1) + options.min)) / 10;
	});

	const maxRatio = Math.max( ...ratioArray );

	return ratioArray.map( ratio => ratio / maxRatio );
};

export const getPointsArray = ( attributes ) => {
	const { sides, complexity, patternSeed } = attributes;
	const ratioArray = getRatioArray( sides, patternSeed );
	const complexityLimiter = 1;
	const points = [];

	// generate the points that will define the shape
	for ( let i = 0; i < sides; i++ ) {
		// generate a regular polygon
		// we add pi/2 to the angle to have the tip of polygons with odd number of edges pointing upwards
		const angle = 2 * Math.PI * i / sides + Math.PI / 2;
		const ratio = ratioArray[i];
		const distance = ratio + ( 1 - ratio ) * ( 100 - complexity * complexityLimiter ) / 100;

		points.push({
			x: BLOB_RADIUS * ( Math.cos( angle ) * distance + 1 ),
			y: BLOB_RADIUS * ( Math.sin( angle ) * distance + 1 )
		});
	}

	return points;
};

export const generatePath = ( attributes ) => {
	const sides = attributes.sides || 0;
	const curvePoints = getCurvePoints( attributes );
	const missingPoints = BLOB_MAX_SIDES - sides;

	return getPathFromCurvePoints( curvePoints, missingPoints );
};

export const getCurvePoints = ( attributes ) => {
	const curvePoints = getCurvePointsFromPoints( attributes );
	const bounds = getBoundsFromCurves( curvePoints );

	return curvePoints;
};

export const getPathFromCurvePoints = ( curvePoints, missingPoints = 0 ) => {
	let path;
	let curves = '';
	let firstPoint = '';

	if ( ! curvePoints.length ) {
		return '';
	}

	for ( let i = 0; i < curvePoints.length; i ++ ) {
		const c = curvePoints[i];

		curves += ` C ${ c.x1 } ${ c.y1 } ${ c.x2 } ${ c.y2 } ${ c.m2x } ${ c.m2y }`;

		const dummyPointsCount = Math.round( missingPoints / (
			curvePoints.length - i
		) );

		for ( let j = 0; j < dummyPointsCount; j ++ ) {
			curves += ` C ${ c.m2x } ${ c.m2y } ${ c.m2x } ${ c.m2y } ${ c.m2x } ${ c.m2y }`;
		}

		if ( i === 0 ) {
			firstPoint = `${ c.m1x } ${ c.m1y }`;
		}

		missingPoints -= dummyPointsCount;
	}

	// move to first point
	path = 'M ' + firstPoint;

	// add the curves to draw the actual path
	path += curves;

	// close the path
	path += ' Z';

	return path;
};

export const getCurvePointsFromPoints = ( attributes ) => {
	const { sides, smoothness } = attributes;
	const points = getPointsArray( attributes );
	let curvePoints = [];

	for ( let i = 0; i < points.length; i ++ ) {
		const nextIdx = (i + 1) % points.length;
		const prevIdx = (i + points.length - 1) % points.length;
		const nextPt = points[nextIdx];
		const thisPt = points[i];
		const prevPt = points[prevIdx];

		const M1 = {
			x: (prevPt.x + thisPt.x) / 2,
			y: (prevPt.y + thisPt.y) / 2,
		};

		const M2 = {
			x: (thisPt.x + nextPt.x) / 2,
			y: (thisPt.y + nextPt.y) / 2,
		};

		// radius of the hexagon created by the middle points
		const radius = BLOB_RADIUS * Math.cos( Math.PI / sides );
		// distance to original point;
		const dm = BLOB_RADIUS * Math.sin( Math.PI / sides );
		const perfectRatio = Math.tan( Math.PI / ( 2 * sides ) ) * ( 4 / 3 );

		const ratio = ( radius * perfectRatio / dm ) * smoothness / 100;

		const x1 = M1.x * (1 - ratio) + thisPt.x * ratio;
		const y1 = M1.y * (1 - ratio) + thisPt.y * ratio;

		const x2 = M2.x * (1 - ratio) + thisPt.x * ratio;
		const y2 = M2.y * (1 - ratio) + thisPt.y * ratio;

		const newCurvePoint = {
			x1: x1,
			y1: y1,
			x2: x2,
			y2: y2,
			m1x: M1.x,
			m1y: M1.y,
			m2x: M2.x,
			m2y: M2.y
		};

		Object.keys( newCurvePoint ).forEach( key => {
			newCurvePoint[ key ] = Math.floor( newCurvePoint[ key ] * 1000 ) / 1000;
		} )

		curvePoints.push( newCurvePoint );
	}

	return curvePoints;
};

export const getDefaultBounds = () => {
	return {
		xMax: BLOB_RADIUS,
		yMax: BLOB_RADIUS,
		xMin: 0,
		yMin: 0,
		xRatio: 1,
		yRatio: 1,
	}
};

export const initializeBounds = () => {
	return {
		xMax: 0,
		yMax: 0,
		xMin: BLOB_RADIUS,
		yMin: BLOB_RADIUS,
	}
};

export const getBoundsFromCurves = ( points ) => {

	return points.reduce( ( acc, { x1, y1, x2, y2, m1x, m1y, m2x, m2y } ) => {
		const { top, right, bottom, left } = getBoundsOfCurve( m1x, m1y, x1, y1, x2, y2, m2x, m2y );
		const xMin = Math.min( left, acc.xMin );
		const xMax = Math.max( right, acc.xMax );
		const yMin = Math.min( top, acc.yMin );
		const yMax = Math.max( bottom, acc.yMax );
		const xRatio = 2 * BLOB_RADIUS / ( xMax - xMin );
		const yRatio = 2 * BLOB_RADIUS / ( yMax - yMin );

		return { xMin,  xMax,  yMin,  yMax,  xRatio,  yRatio }
	}, { yMin: BLOB_RADIUS, xMax: BLOB_RADIUS, yMax: BLOB_RADIUS, xMin: BLOB_RADIUS } )
};

export const scaleCurvePoints = ( points, bounds, progress = 1 ) => {
	const { xMin, xMax, yMin, yMax, xRatio, yRatio } = bounds;

	for ( let i = 0; i < points.length; i ++ ) {
		const { x1, x2, y1, y2, m1x, m2x, m1y, m2y } = points[i];

		const newPoint = {
			x1: ( x1 - xMin ) * xRatio,
			x2: ( x2 - xMin ) * xRatio,
			m2x: ( m2x - xMin ) * xRatio,
			m1x: ( m1x - xMin ) * xRatio,
			y1: ( y1 - yMin ) * yRatio,
			y2: ( y2 - yMin ) * yRatio,
			m1y: ( m1y - yMin ) * yRatio,
			m2y: ( m2y - yMin ) * yRatio
		}

		Object.keys( points[i] ).forEach( key => {
			points[i][key] = points[i][key] + ( newPoint[key] - points[i][key] ) * progress
		} );
	}
};

export const scalePoints = ( points, bounds, progress = 1 ) => {
	const { xMin, xMax, yMin, yMax, xRatio, yRatio } = bounds;

	for ( let i = 0; i < points.length; i ++ ) {
		const { x, y } = points[i];

		const newPoint = {
			x: ( x - xMin * progress ) * ( 1 + ( xRatio - 1 ) * progress ),
			y: ( y - yMin * progress ) * ( 1 + ( yRatio - 1 ) * progress ),
		}

		Object.keys( points[i] ).forEach( key => {
			points[i][key] = points[i][key] + ( newPoint[key] - points[i][key] ) * progress
		} );
	}
};

