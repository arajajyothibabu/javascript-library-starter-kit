const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const version = require('../package').version

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css"
});

const context = path.join(process.cwd(), 'src');

module.exports = {

    context: context, //the home directory for webpack

    devtool: 'source-map', // enhance debugging by adding meta info for the browser devtools

    entry: {
        libraryName: './index.js'
    },

    output: {
        path: path.join(process.cwd(), 'dist'),
        //filename: '[name].js',
        filename: '[name].' + version + '.js',
        //filename: '[name].[hash].js',
        publicPath: '/',
        sourceMapFilename: '[name].map'
    },

    resolve: {
        extensions: ['.js'],  // extensions that are used
        modules: [context, 'node_modules'] // directories where to look for modules
    },

    module: {
        rules: [/*{
            enforce: "pre", //to check source files, not modified by other loaders (like babel-loader)
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "eslint-loader"
        },*/ {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'es2015', 'stage-2']
                }
            }
        },{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }],
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {root: process.cwd()}),
        /*new webpack.optimize.CommonsChunkPlugin({
            name: "vendor"
        }),*/
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        extractSass
    ]
};