import React, { useContext } from "react";
import { BlobsViewContext } from "../context";
import { animated, useSpring } from "react-spring";

export const Controls = () => {
	const store = useContext( BlobsViewContext );
	const { sides, setSides, smoothness, setSmoothness, complexity, setComplexity, showAll, setShowAll, showRandomize, setSeed } = store;

	return (
		<div className={ "__ro-blobs-block__controls" }>
			<h4 className={ "__ro-blobs-block__controls-title" }>Controls</h4>
			<div className={ "__ro-blobs-block__controls-group" }>
				<div className={ "__ro-blobs-block__control" }>
					<p>Sides:</p>
					<input type="range" min={ 3 } max={ 12 } value={ sides } onChange={ ( e ) => { setSides( parseInt( e.target.value, 10 ) ) } }/>
				</div>
				<Smoothness />
				<Complexity />
			</div>
			<div className={ "__ro-blobs-block__controls-group" }>
				{ showRandomize && <div className={ "__ro-blobs-block__control" }>
					<button onClick={ () => {
						const newSeed = Math.floor( Math.random() * 1000 );
						setSeed( newSeed ) } }>Randomize</button>
				</div> }
				<div className={ "__ro-blobs-block__control" }>
					<button onClick={ () => { setShowAll( ! showAll ) } }>Toggle Guides</button>
				</div>
			</div>
		</div>
	)
}

const Smoothness = () => {
	const store = useContext( BlobsViewContext );
	const { smoothness, showSmoothness, setSmoothness } = store;

	const spring = useSpring( { opacity: showSmoothness ? 1 : 0 } );

	return (
		<animated.div style={ spring } className={ "__ro-blobs-block__control" }>
			<p>Smoothness:</p>
			<input type="range" min={ 0 } max={ 100 } value={ smoothness } onChange={ ( e ) => { setSmoothness( parseInt( e.target.value, 10 ) ) } }/>
		</animated.div>
	)
}

const Complexity = () => {
	const store = useContext( BlobsViewContext );
	const { complexity, showComplexity, setComplexity } = store;

	const spring = useSpring( { opacity: showComplexity ? 1 : 0 } );

	return (
		<animated.div style={ spring } className={ "__ro-blobs-block__control" }>
			<p>Complexity:</p>
			<input type="range" min={ 0 } max={ 100 } value={ complexity } onChange={ ( e ) => { setComplexity( parseInt( e.target.value, 10 ) ) } }/>
		</animated.div>
	)
}