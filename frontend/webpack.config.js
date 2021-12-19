const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "../docs"),
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
            { // Copy CNAME from root of project into /docs folder for GitHub Pages
              source: path.resolve(__dirname, "./CNAME"),
              destination: path.resolve(__dirname, "../docs/CNAME"),
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
