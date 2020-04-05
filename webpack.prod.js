'use strict';

//
// Production configuration file for the Webpack source file bundler
//

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'production',
	// Generate a source map for browser debugging
	devtool: 'source-map'
});
