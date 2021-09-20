const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
    entry: './src/js/app.js',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }

        ]
    },
    resolve: { alias: { vue: 'vue/dist/vue.esm.js' } },
    plugins: [
        new Dotenv({
            path: '../.env',
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'app.css'
        }),
    ]
}
