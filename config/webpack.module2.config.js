const path = require('path');

const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = require('./webpack.config');

module.exports = merge(baseConfig, {
    entry: path.resolve(__dirname, '../src/module/module2/main.js'),
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            inject: false
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, '../public/static'),
                to: path.resolve(__dirname, `../dist/dist/static`)
            }]
        }),
    ],
});