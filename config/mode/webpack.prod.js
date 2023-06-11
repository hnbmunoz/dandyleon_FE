const common = require('../webpack.config.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin');
const { merge } = require('webpack-merge');
const path = require('path');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 

console.log('Running Production')

module.exports = merge(common, {
  output: {
    filename: 'reactBundle.js', // value of [name] is based on value inside entry // purpose of contentHash is for browser caching purposes
    path: path.resolve(__dirname,'../../../dandyleon_core/app/javascript'),
    clean: {
      dry: true, //webpack will inform which files to remove
      // keep: /\.css/ //Informs webpack what to preserve before removing other files ex. preserve all .css files
    },  // Another alternative for clean-webpack-plugin // available for webpack >= 5.20
    assetModuleFilename: 'assets/[name][ext]', // to customize output of asset/resource see link for reference https://webpack.js.org/guides/asset-modules/,
    // publicPath: __dirname+'\\dist\\' // already automamted in webpack 5 
  }, 
  plugins: [ 
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      openAnalyzer: true
    }),
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.(js\css)$/,
      filename: '[path].gz[query]'
      
    }),  
  ]
  
})
