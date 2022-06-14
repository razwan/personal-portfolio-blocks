const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const entries = {
	index: './src/index.js',
	frontend: './src/frontend.js',
}

module.exports = {
	entry: entries,
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [ 'babel-loader' ],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "sass-loader",
						options: {
							// Prefer `dart-sass`
							implementation: require( "sass" ),
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: [ '*', '.js', '.jsx' ],
	},
	output: {
		filename: './[name].js',
	},
	plugins: [
		new MiniCssExtractPlugin( {
			filename: "[name].css",
		} ),
	]
};