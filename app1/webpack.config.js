const path = require('path');
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'src', 'index.js')
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].bundle.js"
    },
    devServer: {
        port: 3001,
        hot: true
    },
    module: {
        rules: [
            {
                test: /bootstrap\.js$/,
                loader: 'bundle-loader',
                options: {
                    lazy: true
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-react"],
                },
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
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
            name: 'app1',
            remotes: {
                app2: `app2@${getRemoteEntryUrl(3002)}`,
            },
        }),

        new HtmlWebpackPlugin({ template: './src/index.html' }), 
        new MiniCssExtractPlugin()
    ],
}

function getRemoteEntryUrl(port) {
    return `//localhost:${port}/remoteEntry.js`;
}