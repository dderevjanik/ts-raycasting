/**
 * Main webpack config
 */
const webpack = require('webpack'),
    path = require('path');

module.exports = {
    entry: ['./src/RayCast.ts'],
    target: 'web',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname + '/dist/web'),
        publicPath: '/dist/web/',
        filename: 'raycast.min.js',
        library: 'raycast',
        libraryTarget: 'var'
    },
    plugins: [
        new webpack.DefinePlugin({
            'VERSION': JSON.stringify(require('./package.json').version)
        })
    ],
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader?configFileName="tsconfig.web.json"',
                exclude: ['node_modules', 'dist', 'example'],
                include: [
                    path.resolve(__dirname, 'src')
                ],
            }
        ]
    }
};
