const common = require('../webpack.config.js')
const path = require('path') 
const { merge } = require('webpack-merge')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
console.log('Running Development')


module.exports = merge(common, {
  output: {
    filename: '[name].[contenthash].js', // value of [name] is based on value inside entry // purpose of contentHash is for browser caching purposes
    path: path.resolve(__dirname,'../../dist'),
    clean: {
      dry: true, //webpack will inform which files to remove
      // keep: /\.css/ //Informs webpack what to preserve before removing other files ex. preserve all .css files
    },  // Another alternative for clean-webpack-plugin // available for webpack >= 5.20
    assetModuleFilename: 'assets/[name][ext]', // to customize output of asset/resource see link for reference https://webpack.js.org/guides/asset-modules/,
    // publicPath: __dirname+'\\dist\\' // already automamted in webpack 5 
  }, 
  devServer: {
    port: 5000,
    proxy: {
      "/": {    
           target: "http://localhost:3000/",
          secure: false,
          changeOrigin: true
      }
    },
    static: {
      directory: path.resolve(__dirname, '../dist'),
    },
    devMiddleware: {
      index: 'index.html',
      writeToDisk: true
    }, 
    client: {
      overlay: true
    },
    liveReload: false, // set to false since hot reload will be used instead  
    open: true,
    hot: true, // hot reloading // another option is to add --hot on package.json

  }

  
})