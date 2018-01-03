'use strict';

//
// Configuration for the Wallaby.js continuous testing tool
//

var compilerOptions = require('./tsconfig.json');
compilerOptions.module = 'CommonJs';

module.exports = function(wallaby) {
	return {
		files: [
			'src/**/*.ts?(x)',
			'src/**/*.snap',
			'!src/**/*_spec.ts?(x)',
			'package.json',
			'tsconfig.json'
		],

		tests: ['src/**/*_spec.ts?(x)'],

		env: {
			type: 'node',
			runner: 'node'
		},

		compilers: {
			'**/*.ts?(x)': wallaby.compilers.typeScript(compilerOptions)
		},

		testFramework: 'jest',

		debug: true,

		bootstrap: function(wallaby) {
			wallaby.testFramework.configure(require('./package.json').jest);
		}
	};
};
