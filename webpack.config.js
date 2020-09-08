const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const OemReplacePlugin = require('./oemReplacePlugin')

const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
  }),
  new MiniCssExtractPlugin(),
  new CleanWebpackPlugin(),
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(new OemReplacePlugin())
}
module.exports = {
  entry: './src/inde.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          MiniCssExtractPlugin.loader, 
          //'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({}),
                require('postcss-pxtorem')({
                  rootValue: 16,
                  propList: ['*'],
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
          },
        ]
      },
      {
        test: /.(png|gif|jpg|jpeg)$/,
        use: "file-loader",
      },
    ]
  },
  plugins,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
  }
}