const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
    entry: './project/src/main.js',
    output: {
        path: resolve(__dirname, 'distWebpack'),
        filename: 'main.[contenthash].js'
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: resolve(__dirname, 'project/index.html')
            }
        ),
        new MiniCssExtractPlugin(
            {
                filename: '[name].[contenthash].css'
            }
        ),
        new CleanWebpackPlugin(),
        //new BundleAnalyzerPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|mp3)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.(c|sa|sc)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    devServer: {
        port: 9000
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};