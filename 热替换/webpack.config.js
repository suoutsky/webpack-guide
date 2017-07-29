const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');// 删除目录插件
const ManifestPlugin = require('webpack-manifest-plugin');// 输出配置
const Webpack = require('webpack');
module.exports = {
    entry: {
      app: './src/index.js',
      vendor: ['lodash']
    },
    devtool: 'inline-source-map', // debug source-map
    // dev-server 小型node服务器
    devServer: {  
      hot: true, //告诉 dev-server 要使用HMR    
      contentBase: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    // 虽然在 dist/ 文件夹我们已经有 index.html 这个文件，然而 HtmlWebpackPlugin 还是会默认生成 index.html 文件。
    // 这就是说，它会用新生成的 index.html 文件，把我们的原来的替换。
    plugins: [
      new Webpack.HotModuleReplacementPlugin(), //热替换
      new ManifestPlugin({
          fileName: 'my-manifest.json',
          basePath: '/app/',
          seed: {
            name: 'My Manifest'
          }
      }),
      new CleanWebpackPlugin(['dist']),  
      new HtmlWebpackPlugin({
        title: 'output manger',
        filenameL: 'index.html',
        template: 'src/index.html'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    }
};