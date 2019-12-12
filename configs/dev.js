const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    target: 'web',
    devtool: 'eval',
    devServer: {
        contentBase: path.resolve(__dirname, '../dev'),
        hot: true,
        watchContentBase: true,
        watchOptions: {
            poll: true
        }
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })
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