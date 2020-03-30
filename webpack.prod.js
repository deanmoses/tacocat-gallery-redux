'use strict';

//
// Production configuration file for the Webpack source file bundler
//

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map'
});
