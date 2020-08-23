const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports ={

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
                include: [path.resolve(__dirname,'src')]
            },
            {
                test: /\.js$/,
                loader:'babel-loader',
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
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
                filename:'app.css'
        }),
    
    ]
}
