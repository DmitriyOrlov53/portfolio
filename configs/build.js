const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'production',
    target: 'web',

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        }),
        new CleanWebpackPlugin()
    ],

    entry: './configs/entry.js',
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, '../build')
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {   
                        loader: 'sass-loader',
                        options: {
                            implementation: require('node-sass')
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, '../dev'),
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                require('postcss-import')({ root: loader.resourcePath }),
                                require('postcss-preset-env'),
                                require('cssnano')
                            ]
                        }
                    }
                ]
            },
            { //pictures
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: './pictures/[name].[ext]',
                }
            },
            { //icons
                test: /\.svg$/,
                loader: 'file-loader',
                options: {
                    name: './icons/[name].svg',
                }
            },
            {//fonts
                test: /\.(ttf|otf)?$/,
                loader: 'file-loader',
                options: {
                  name: './fonts/[name].[ext]'
                }
            },
            {//html
                test: /\.html$/,
                use: [
                        'file-loader?name=[name].[ext]',
                        'extract-loader',
                        'html-loader'
                    ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                include: /dev/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        sourceMap: true,
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}