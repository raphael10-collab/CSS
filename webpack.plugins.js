const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin")
const path = require('path')

const tailwindcss = require('tailwindcss')

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

// https://stackoverflow.com/questions/65018431/webpack-5-uncaught-referenceerror-process-is-not-defined
// https://stackoverflow.com/questions/68542553/webpack-5process-is-not-defined-triggered-by-stream-browserify
// https://webpack.js.org/plugins/provide-plugin/

const webpack = require('webpack')


module.exports = [


  new ForkTsCheckerWebpackPlugin(),

  //new webpack.ProvidePlugin({
    //process: 'process/browser',
  //}),

  //new webpack.LoaderOptionsPlugin({
      //options: {
        //__webpack_nonce__ : 'c29tZSBjb29sIHN0cmluZyB3aWxsIHBvcCB1cCAxMjM=',
      //},
  //}),


  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, "./src/assets/svg"),
        to: path.resolve(__dirname, ".webpack/assets/svg")
      },
    ]
  }),

  new MiniCssExtractPlugin(),


];
