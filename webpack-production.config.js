const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: [path.join(__dirname, '/src/app/App.jsx')],
    // Render source-map file for final build
    devtool: 'source-map',
    // output config
    output: {
        path: buildPath, // Path of output file
        filename: 'app.js', // Name of output file
    },
    plugins: [
        // Define production build to allow React to strip out unnecessary checks
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        // Minify the bundle
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // suppresses warnings, usually from module minification
                warnings: false,
            },
        }),
        // Allows error warnings but does not stop compiling.
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("main.css"),
        // Transfer Files
        new TransferWebpackPlugin([
            {from: 'www'},
        ], path.resolve(__dirname, 'src')),
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        root: path.resolve('./src')
    },
    module: {
        loaders: [
            {test: /\.js$/, loaders: ['babel'], exclude: [nodeModulesPath]},
            {test: /\.jsx$/, loaders: ['babel'], exclude: [nodeModulesPath]},
            {test: /\.scss$/, loaders: ['style', 'css', 'sass']},
            {test: /\.css$/, loaders: ['style', 'css']},
            {test: /\.html$/, loader: 'html'},
            {test: /\.json$/, loaders: ['json']},
            {test: /\.png$/, loader: 'file'},
            {test: /\.jpe?g$/, loader: 'file'},
            {test: /\.gif$/, loader: 'file'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'}
        ],
    },
};

module.exports = config;
