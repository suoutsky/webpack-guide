var path = require('path');
var os = require('os');
var webpack = require('webpack');
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length});
function resolve (dir) {
    return path.join(__dirname, '..', dir);
}

process.env.NODE_ENV = 'production';

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'iview.min.js',
        library: 'iview',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    module: {
        rules: [
            {
                // https://vue-loader.vuejs.org/en/configurations/extract-css.html
                test: /\.vue$/,
                loader: 'vue-loader',
                // loader: 'happypack/loader?id=vue'         
                options: {
                    loaders: {
                        css: 'vue-style-loader!css-loader',
                        less: 'vue-style-loader!css-loader!less-loader'
                    },
                    postLoaders: {
                      html: 'babel-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                // loader: 'babel-loader',
                loader: 'happypack/loader?id=js',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'autoprefixer-loader'
                ]
            },
            {
                test: /\.less/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                 test: /\.scss$/,
                 use: [
                     'style-loader',
                     'css-loader',
                     'sass-loader?sourceMap'
                 ]
            },
            { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=8192'},
            { test: /\.(html|tpl)$/, loader: 'html-loader' }
        ]
      },
      resolve: {
          extensions: ['.js', '.vue'],
          alias: {
              'vue': 'vue/dist/vue.esm.js',
              '@': resolve('src')
          }
      },
    plugins: [
        // @todo
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        
        // new HappyPack({
        //     id: 'vue',
        //     loaders: [ 'vue-loader', 'vue-style-loader!css-loader!less-loader', 'babel-loader'],
        //     threadPool: happyThreadPool,
        //     cache: true,
        //     verbose: true
        // }),
        new HappyPack({
        // 3) re-add the loaders you replaced above in #1:
          id: 'js',
          loaders: [ 'babel-loader'],
          threadPool: happyThreadPool,
          cache: true,
          verbose: true
        })
    ]
};
