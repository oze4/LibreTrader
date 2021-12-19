const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "../docs"),
    publicPath: "/",
    filename: "libre-trader.js",
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
        resolve: { extensions: [".js", ".jsx"] },
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            {
              // Copy CNAME from root of project into /docs folder for GitHub Pages
              source: path.resolve(__dirname, "./CNAME"),
              destination: path.resolve(__dirname, "../docs/CNAME"),
            },
            {
              // Copy 404 from root of project into /docs folder for GitHub Pages 
              // otherwise refresh will cause 404
              source: path.resolve(__dirname, "./public/404.html"),
              destination: path.resolve(__dirname, "../docs/404.html"),
            },
          ],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./public/index.ejs",
      filename: "./index.html",
      title: "LibreTrader",
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: "./",
  },
};
