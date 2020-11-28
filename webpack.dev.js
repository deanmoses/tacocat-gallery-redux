'use strict';

//
// Development configuration file for the Webpack source file bundler
//

const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	devtool: 'eval-source-map'
});
