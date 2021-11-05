const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'src', 'bootstrap.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].bundle.js"
    },
    devServer: {
        port: 3002,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'app2',
            filename: 'remoteEntry.js',
            exposes: {
                './Button': './src/components/Button',
                './Artists': './src/components/Artists'
            },       
        }),
        new HtmlWebpackPlugin({ template: './src/index.html' }), 
        new MiniCssExtractPlugin()
    ]
}