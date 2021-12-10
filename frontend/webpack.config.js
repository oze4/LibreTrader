const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'libre-trader-fe-bundle.js',
        clean: true,
    },
    performance: {
        hints: false,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                resolve: { extensions: ['.js', '.jsx'] },
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.ejs',
            filename: './index.html',
            title: 'Libre Trader',
        }),
    ],
    devServer: {
        historyApiFallback: true,
        static: './',
    },
};
