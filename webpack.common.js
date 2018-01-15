'use strict';

//
// Configuration file for the Webpack source file bundler
// This is the common config, imported by the prod and dev configs
//

const webpack = require('webpack');
const path = require('path');

const PATH_TO_SRC = path.join(__dirname, 'src');

var config = {
	// The base directory, an absolute path, for resolving entry points and loaders from configuration
	context: PATH_TO_SRC,

	// The entry point into the application. At this point the application starts executing
	entry: './index.tsx',

	output: {
		// The output directory as an absolute path
		path: path.join(__dirname, 'dist'),

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
		extensions: ['.ts', '.tsx', '.js', '.json']
	},

	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'
			{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'
			{ test: /\.js$/, loader: 'source-map-loader', enforce: 'pre' }
		]
	},

	// Development webserver configuration
	devServer: {
		// Path to static assets.  This is NOT where bundle.js is served from;
		// Webpack bundles the javascript internally and serves it from memory.
		contentBase: path.join(__dirname, 'dist'),

		// Detect when dist changes and reload the browser.
		// This is needed detect changes to the CSS and HTML,
		// which webpack does not process.
		watchContentBase: true
	}
};

module.exports = config;
