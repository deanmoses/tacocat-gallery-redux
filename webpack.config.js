const webpack = require('webpack');
const path = require('path');

// This helper function is not strictly necessary.
// I just don't like repeating the path.join a dozen times.
function srcPath(subdir) {
    return path.join(__dirname, "src", subdir);
}

var config = {
    // context: the base directory, an absolute path, for resolving entry points and loaders from configuration
    context: __dirname + '/src',

    // entry: the point or points to enter the application. At this point the application starts executing. 
    entry: "./index.tsx",

    output: {
        // path: the output directory as an absolute path
        path: __dirname + "/app",

        // filename: the name of the output bundle
        filename: "bundle.js"
    },

    plugins: [
        new webpack.DefinePlugin({
            ON_TEST: process.env.NODE_ENV === 'test'
        })
    ],

    resolve: {
        // Needed so files can import from 'components/App' instead of './components/App'
        alias: {
            actions: srcPath('actions'),
            components: srcPath('components')
        },
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            { test: /\.html$/, loader: 'raw', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style!css', exclude: /node_modules/ },
            { test: /\.styl$/, loader: 'style!css!stylus', exclude: /node_modules/ }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, "src")
    }
};

if (process.env.NODE_ENV === 'production') {
    config.output.path = __dirname + '/dist';
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
    config.devtool = 'source-map';
}

module.exports = config;