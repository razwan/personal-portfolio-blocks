const { registerBlockType } = wp.blocks;
const { useBlockProps, InnerBlocks, useInnerBlocksProps } = wp.blockEditor;

import meta from './block.json';

const MY_TEMPLATE = [
	[ 'core/paragraph', {} ],
];

registerBlockType( meta.name, {
	...meta,
	edit: ( props ) => {
		const blockProps = useBlockProps( {
			className: '__ro-demo-block__content'
		} );

		const innerBlocksProps = useInnerBlocksProps( blockProps, {
			template: MY_TEMPLATE,
			templateLock: false,
		} );

		return (
			<div { ...innerBlocksProps } />
		)
	},
	save: ( props ) => <InnerBlocks.Content />
} );