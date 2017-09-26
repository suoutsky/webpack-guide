const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');// 删除目录插件
console.log(__dirname);
module.exports = {
    entry: {
      vendor: [ 'vue', 'vue-router'] 
    },
    output: {
      path: path.join(__dirname, '../dist'),
      filename: '[name]_[hash:8].js'
    },
    plugins: [
      new CleanWebpackPlugin(
        ['dist'],　 //匹配删除的文件
        {
            root: path.join(__dirname, '../'), //根目录
            verbose:  true, //开启在控制台输出信息
            dry:      false //启用删除文件
        }
      ),
      new webpack.DllPlugin({
        path: './dist/manifest.json',
        name: '[name]',
        context: __dirname
      })
    ]
}