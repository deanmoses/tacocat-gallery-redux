const webpack = require('webpack');
const path = require('path');

const PATH_TO_SRC = path.join(__dirname, 'src');

/**
 * Helper function to avoid repeating path.join a dozen times
 */
function srcPath(subdir) {
	return path.join(PATH_TO_SRC, subdir);
}

var config = {
	// The base directory, an absolute path, for resolving entry points and loaders from configuration
	context: PATH_TO_SRC,

	devtool: 'source-map',

	// The entry point into the application. At this point the application starts executing
	entry: './index.tsx',

	output: {
		// The output directory as an absolute path
		path: __dirname + '/app',

		// The name of the output bundle
		filename: 'bundle.js'
	},

	plugins: [
		new webpack.DefinePlugin({
			ON_TEST: process.env.NODE_ENV === 'test'
		})
	],

	resolve: {
		// Enable files to import from '@src/components/App' instead of './components/App'
		// These work with the 'path' setting in the Typescript config file, tsconfig.json
		// For Jest tests to work, in package.json you need to add 	the following:
		//   "jest": {"moduleNameMapper": {"^@src(.*)$": "<rootDir>/src$1"},"@src/*": ["src/*"]}
		alias: {
			'@src': PATH_TO_SRC
		},
		// Add '.ts' and '.tsx' as resolvable extensions
		extensions: ['.ts', '.tsx', '.js', '.json']
	},

	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'
			{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'
			{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
			{ test: /\.html$/, loader: 'raw', exclude: /node_modules/ },
			{ test: /\.css$/, loader: 'style!css', exclude: /node_modules/ },
			{ test: /\.styl$/, loader: 'style!css!stylus', exclude: /node_modules/ }
		]
	},

	devServer: {
		contentBase: PATH_TO_SRC
	}
};

if (process.env.NODE_ENV === 'production') {
	config.output.path = __dirname + '/dist';
	config.plugins.push(new webpack.optimize.UglifyJsPlugin());
	config.devtool = 'source-map';
}

module.exports = config;
