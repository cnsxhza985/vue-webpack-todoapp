const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isDev = process.env.NODE_ENV === 'development'
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const config = {
  target: 'web',
  entry: path.join(__dirname,'src/index.js'),
  output: {
      filename: 'bundle.js',
      path: path.join(__dirname,'dist')
  },
  mode: 'development' ,
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ],
  module:{
    rules:[
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
              // the "scss" and "sass" values for the lang attribute to the right configs here.
              // other preprocessors should work out of the box, no loader config like this necessary.
              'scss': [
                'vue-style-loader',
                'css-loader',
                'sass-loader'
              ],
              'sass': [
                'vue-style-loader',
                'css-loader',
                'sass-loader?indentedSyntax'
              ]
            }
            // other vue-loader options go here
          }
        }, 
        {
          test: /\.jsx$/,
          loader: 'babel-loader'
        },         
        {
            test: /\.css$/,
            use: [
              'vue-style-loader',
              'css-loader'
            ],
          },
          {
            test: /\.scss$/,
            use: [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
          },
          {
            test: /\.sass$/,
            use: [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ],
          },
          {
            test: /\.styl/,
            use: [
              'style-loader',
              'css-loader',
              {
                loader: "postcss-loader",
                options:{
                  sourceMap: true,
                }

              },
              'stylus-loader'
            ]
          },
          {
            test: /\.(png|jpg|gif|svg)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 1024,
                  name: '[name].[ext]?[hash]'
                }
              }
            ]
          }
    ]
  }
}

if(isDev){
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay:{
      errors:true,
    },
    hot: true,
    open: true,
  }

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config

