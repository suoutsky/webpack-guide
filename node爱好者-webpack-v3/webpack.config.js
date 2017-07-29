const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: './index.js',
    output: {
        filename: '[name].js',
        // chunckFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
          { test: /\.txt$/, use: 'raw-loader'},
          { 
              test: /\.js$/, 
              use: 'babel-loader',
              exclude: /node_modules/
          },
          {test: /\.(png|jpg)$/, use: 'url-loader?limit=8192'},
          {
              test: /\.scss$/,
              use: [{
                  loader: 'style-loader' //将 JS字符串转为style节点
              }, {
                  loader: 'css-loader'  //将 css转为 CommonJs模块
              }, {
                  loader: 'sass-loader' // 将sass 转为 css
              }]
          }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 启用 HMR
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({template: './src/index.html'})
    ],
    devServer: {
        hot: true, // 告诉 dev-server 我们在使用 HMR
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    }

}
module.exports = config;
