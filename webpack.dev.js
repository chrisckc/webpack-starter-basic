const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildPath = path.resolve(__dirname, 'dist');
const baseUrl = '/app';

module.exports = {
    devtool: 'eval-cheap-module-source-map',
    entry: './src/index.js',
    output: {
        filename: '[name].[hash:20].js',
        path: buildPath,
        publicPath: baseUrl
    },
    devServer: {
        port: 8080,
        contentBase: buildPath
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        // creates style nodes from JS strings
                        loader: "style-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // translates CSS into CommonJS
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // compiles Sass to CSS
                        loader: "sass-loader",
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: true,
                            sourceMapContents: true
                        }
                    }
                    // Please note we are not running postcss here
                ]
            }
            ,
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader', // loader: 'url-loader',
                        options: {
                            // On development we want to see where the file is coming from, hence we preserve the [path]
                            name: '[path][name].[ext]?hash=[hash:20]',
                            //limit: 8192
                            //publicPath: baseUrl
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true
        })
    ]
};
