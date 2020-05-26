import * as path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import * as webpack from 'webpack';

const config: webpack.Configuration =  {
    context: path.resolve(__dirname, './dev'),
    entry: './index.ts',
    output: {
        filename: './index.js',
        path: path.resolve(__dirname, './build')
    },
    devServer: {
        hot: true,
        watchContentBase: true
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Landing',
            template: './index.html',
            filename: './index.html',
            inject: 'head',
            scriptLoading: 'defer',
            showErrors: true,
            esModule: true
          })
    ],
    mode: 'development',
    target: 'web',
    devtool: 'eval',
    cache: {
        type: 'filesystem'
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass|css)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].css'
                        }
                    },
                    'extract-loader',
                    'css-loader',
                    'resolve-url-loader',
                    {   
                        loader: 'sass-loader',
                        options: {
                            implementation: require('node-sass'),
                            sourceMap: true
                        }
                    },
                    'cache-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|ttf|otf)$/i,
                loader: 'file-loader',
                options: {name: './assets/[name].[ext]'}
            },
            {
                test: /\.html$/,
                use: [
                        {
                            loader: 'html-loader',
                            options: {
                                esModule: true
                            }
                        },
                        'cache-loader'
                    ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    'cache-loader',
                    'ts-loader'
                ]
            },
        ]
    }
}

export default config;