// const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.join(__dirname, "./client/index.js"),
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },
  //   mode: process.env.NODE_ENV,
  mode: "development",
  //dont need to npm to run dev if we have anychange
  watch: true,
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({ title: "development", template: "./index.html" }),
  ],
  devServer: {
    historyApiFallback: true,
    host: "localhost",
    port: 8080,
    static: {
      directory: path.resolve(__dirname),
      publicPath: "/",
    },
    proxy: [
      {
        context: ["/api", "/test", "/user"],
        target: "http://localhost:3000",
      },
    ],
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.mp3$/,
        loader: "file-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      //add rules for tailwind css
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("tailwindcss"), require("autoprefixer")],
              },
            },
          }, // Add postcss-loader for processing Tailwind CSS
        ],
      },
    ],
  },
};
