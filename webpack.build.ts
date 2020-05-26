import * as path from 'path';
import HTMLPlugin from 'html-webpack-plugin';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
    context: path.resolve(__dirname, './dev'),
    entry: './index.ts',
    output: {
        filename: './index.js',
        path: path.resolve(__dirname, './build')
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new HTMLPlugin({
            template: './index.html',
            filename: './index.html',
            inject: 'head',
            scriptLoading: 'defer',
            showErrors: true,
        })
    ],
    mode: 'production',
    target: 'web',
    module: { 
        rules: [
        {
            test: /\.(scss|sass|css)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: './[name].css'
                    }
                },
                'extract-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: (loader: any) => [
                        require('postcss-import')({ root: loader.resourcePath }),
                        require('postcss-preset-env'),
                        require('cssnano'),
                        require('autoprefixer')
                        ]
                    }
                },
                'resolve-url-loader',
                {   
                    loader: 'sass-loader',
                    options: {
                        implementation: require('node-sass'),
                        sourceMap: true,
                        sassOptions: {
                            outputStyle: 'compressed',
                          },
                    }
                }
            ]
        },
        {
            test: /\.(png|jpe?g|gif|svg)$/i,
            loader: 'file-loader',
            options: {name: './assets/[name].[ext]'}
        },
        {
            test: /\.(ttf|otf)$/i,
            loader: 'file-loader',
            options: {
                name: './fonts/[name].[ext]'
            }

        },
        {
            test: /\.html$/,
            use: [
                {
                    loader: 'html-loader'
                }
            ]
        },
        {
            test: /\.tsx?$/,
            loader: 'ts-loader'
        },
    ]}
}

export default config;
