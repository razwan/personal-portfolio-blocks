const { registerBlockType } = wp.blocks;
const { useBlockProps, InnerBlocks, useInnerBlocksProps } = wp.blockEditor;

import meta from './block.json';

const MY_TEMPLATE = [
	[ 'razvanonofrei/demo-content', {} ],
	[ 'razvanonofrei/demo-view', {} ],
];

registerBlockType( meta.name, {
	...meta,
	edit: ( props ) => {
		const blockProps = useBlockProps( {
			className: '__ro-demo-block alignwide'
		} );

		const innerBlocksProps = useInnerBlocksProps( blockProps, {
			template: MY_TEMPLATE,
			templateLock: 'all'
		} );

		return (
			<div { ...innerBlocksProps } />
		)
	},
	save: ( props ) => <InnerBlocks.Content />
} );