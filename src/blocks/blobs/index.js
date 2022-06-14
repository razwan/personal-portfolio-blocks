const { registerBlockType } = wp.blocks;
const { useBlockProps } = wp.blockEditor;

import meta from './block.json';

registerBlockType( meta.name, {
	...meta,
	edit: ( props ) => {
		const blockProps = useBlockProps();

		return (
			<div { ...blockProps }>
				<p>Blobs</p>
			</div>
		)
	},
	save: () => null
} );