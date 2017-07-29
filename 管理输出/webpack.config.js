const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');// 删除目录插件
const ManifestPlugin = require('webpack-manifest-plugin');// 输出配置

module.exports = {
    entry: {
      app: './src/index.js',
      vendor: ['lodash']
    },
    // 虽然在 dist/ 文件夹我们已经有 index.html 这个文件，然而 HtmlWebpackPlugin 还是会默认生成 index.html 文件。
    // 这就是说，它会用新生成的 index.html 文件，把我们的原来的替换。
    plugins: [
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
      path: path.resolve(__dirname, 'dist')
    }
};