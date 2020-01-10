const merge = require('webpack-merge');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const prod = {
    mode: 'production',
    target: 'web',
    module: { rules: [
        {
            test: /\.(scss|css)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: './',
                        name: './styles.css'
                    }
                },
                'extract-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: (loader) => [
                        require('postcss-import')({ root: loader.resourcePath }),
                        require('postcss-preset-env'),
                        require('cssnano')
                        ]
                    }
                },
                {   
                    loader: 'sass-loader',
                    options: {implementation: require('node-sass')}
                }
            ]
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader',
            options: {name: './pictures/[name].[ext]'}
        },
        {
            test: /\.svg$/,
            loader: 'file-loader',
            options: {name: './icons/[name].svg'},
        },
        {
            test: /\.(ttf|otf)?$/,
            loader: 'file-loader',
            options: {
                outputPath: 'fonts',
                name: '[name].[ext]'
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
                {
                    loader: 'html-loader',
                    options: {minimize: true}
                }
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
                    presets: ['@babel/preset-env']
                }
            }
        }
    ]},
    plugins: [new CleanWebpackPlugin]
}
module.exports = merge.multiple ([
    merge(prod, require('./entries/index')),
    merge(prod, require('./entries/calculator'))
    ]
)