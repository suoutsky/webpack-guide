# duiba-dev-new

## 安装和开发

``` bash
# 安装依赖（建议使用cnpm）
npm install

# 开发模式 localhost:8888
npm run devc #完整版后台
npm run devs #简版后台

#开发模式 简版后台
npm run watch

# 构建
npm run buildc #完整版后台
npm run builds #简版后台

# deploy
npm run deployc #完整版后台
npm run deploys #简版后台

# 单元测试
npm run unit

# e2e测试
npm run e2e

# 所有测试用例
npm test
```

## 配置Mock

`mock`数据现在不需要在`dev-server.js`中配置了，当需要在现有的页面增加接口时只需在`routes/complete/page.js`中新增一个配置，分为`post`和`get`等类型，其中`key`为对应的请求地址，`value`为本地mock数据，然后在`mock`目录中配置对应的`json`文件，例如：

```
module.exports = {
  post: {
    '/developer/doCreate': '/addapp/index.json',
    '/developer/index': '/addapp/doCreate.json'
  },
  get: {

  }
};
```

## 增加entry

`webpack`的`entry`统一放在了`config/entry`中配置，然后由`utils.computeEntry`和`utils.computeHtmlWebpackPlugin`计算所需的配置，从而减少代码冗余以及每次新增`entry`时都要改好几处的问题。

## webpack优化文档

[webpack优化](http://gitlab2.dui88.com/frontend/duiba-dev-new/wikis/webpack-optimize)

