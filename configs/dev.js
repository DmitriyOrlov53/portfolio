const merge = require('webpack-merge');
const path = require('path');
const dev = {
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
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './',
                            name: 'styles.css'
                        }
                    },
                    'extract-loader',
                    'css-loader',
                    {   
                        loader: 'sass-loader',
                        options: {implementation: require('node-sass')}
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
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './icons/[name].svg',
                        }
                    }
                ]
            },
            {//fonts
                test: /\.(ttf|otf)?$/,
                loader: 'file-loader',
                options: {
                  name: './fonts/[name].[ext]'
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {name: './index.html'}
                    },
                    'extract-loader',
                    'html-loader',
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                include: /dev/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        sourceMap: true,
                    }
                }
            }
        ]
    }
}
module.exports = merge.multiple ([
    merge(dev, require('./entries/index')),
    merge(dev, require('./entries/calculator'))
    ]
)