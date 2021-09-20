const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports ={
    devtool:'source-map',
    entry: './src/js/app.js',
    mode:'development',
    output:{
        filename:'main.js',
        path:path.resolve(__dirname,'dist'),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader:'vue-loader',
                include: [path.resolve(__dirname,'src')],
                options:{
                    sourceMap:true
                }
            },
            {
                test: /\.js$/,
                loader:'babel-loader',
                options:{
                    sourceMap:true
                }
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
                filename:'app.css'
        }),
        new HtmlWebpackPlugin({
                filename: 'dist/index.html',
                template: 'dist/index.html',
                inject: true
        })
    ]
}

