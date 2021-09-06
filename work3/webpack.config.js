const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

//Признак того в каком режиме происходит сборка проекта
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

//Для того что бы в девелопе названия файлов без были хеша
const fileName = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
    //папка с исходниками
    context: resolve(__dirname, 'src'),
    //входная точка
    entry: './js/main.js',
    //куда все будет складываться
    output: {
        filename: `./js/${fileName('js')}`,
        path: resolve(__dirname, 'dist'),
    },
    devtool: isProd ? false : 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        port: 9000,
        //возвращается к index.html, когда маршрут не найден (404)
        historyApiFallback: true,
        //включить сжатие gzip
        compress: true,
        //обновление содержимого html и css без обновления страницы
        hot: true
    },
    plugins: [
        //для того что бы появился index.html файл
        new HtmlWebpackPlugin(
            {
                template: resolve(__dirname, 'src/index.html'),
                filename: 'index.html'
            }
        ),
        //для того что бы появился .css файл
        new MiniCssExtractPlugin(
            {
                filename: `./css/${fileName('css')}`,
            }
        ),
        //чистим папку dist при каждой сборки
        new CleanWebpackPlugin(),
        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    ['mozjpeg', {quality: 10}]
                ]
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            //если включить тогда все медиа из html будут грузится автоматом
                            //Но так как использую file-loader то обрабатываю руками
                            esModule: false
                        }
                    }]
            },
            {
                test: /\.(c|sa|sc)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: fileName('[ext]'),
                            outputPath: 'media/img/'
                        }
                    },
                ]
            },
            {
                test: /\.(mp3)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: fileName('[ext]'),
                            outputPath: 'media/audio/'
                        }
                    },
                ]
            },
            {
                test: /\.(mp4)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: fileName('[ext]'),
                            outputPath: 'media/video/'
                        }
                    },
                ]
            }
        ]
    }

};