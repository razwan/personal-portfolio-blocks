import React from 'react';
import ReactDOM from 'react-dom';

import { View } from './components';

const domReady = wp.domReady;

domReady( () => {
	const blocks = Array.from( document.querySelectorAll( '.__ro-blobs-block' ) );

	blocks.forEach( block => {
		const element = document.createElement( 'div' );
		element.classList.add( '__ro-blobs-block__wrapper' );
		ReactDOM.render( <View />, element );
		block.appendChild( element );
	} );
} )
