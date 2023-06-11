const path = require('path') 
const TerserPlugin = require('terser-webpack-plugin')  // already in webpack 5 
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

console.log('initializing webpack ....')

module.exports = {
  entry: {
    // 'bundle': path.resolve( "./src/index.tsx"),
    'css_bundle': path.resolve( "./src/assets/scss/base.scss"),
  },
  output: {
    // filename: "[name].[contenthash].css",
    path: path.resolve(__dirname,'../../dandyleon_core/app/assets/stylesheets/bundle'),
    // path: path.resolve(__dirname,'../dist'),
    // clean: {
    //   dry: true, //webpack will inform which files to remove
    //   keep: /\.css/ //Informs webpack what to preserve before removing other files ex. preserve all .css files
    // },  // Another alternative for clean-webpack-plugin // available for webpack >= 5.20
  
  },
 
  module: {
    rules: [  
      {
        test: /\.(css|scss)$/,
        // test: /\.scss$/,
        exclude: /\.module\.css$/,
        use: [
          // 'style-loader', // creates style nodes from JS strings
          MiniCssExtractPlugin.loader,
          'css-loader',  // translates CSS into CommonJS
          'sass-loader',  // compiles Sass to CSS, using Node Sass by default
          // npm install sass in case sass-loader is making errors https://stackoverflow.com/questions/54045869/npm-run-cannot-find-module-sass-after-repeated-reinstall-attempts
        ]
      },      
    ]
  },
  plugins : [
    new TerserPlugin(), // minimize bundle.js
    new MiniCssExtractPlugin({
      // bundles css file
      // filename: "CSSBundle.css", // purpose of contentHash is for browser caching purposes

      filename: "[name].css", // purpose of contentHash is for browser caching purposes
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*', //format for deleting files and subfolders default locations is based on output path
        path.join(process.cwd(), 'build/**/*') // format for deleting files on other folders 
      ]
    })

  ]  
}