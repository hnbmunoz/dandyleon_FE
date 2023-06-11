const path = require('path') 
const TerserPlugin = require('terser-webpack-plugin')  // already in webpack 5 
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

console.log('initializing webpack ....')

module.exports = {
  entry: {
    'bundle': path.resolve( "./src/index.tsx"),
    // 'sass': path.resolve( "./src/assets/scss/base.scss"),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'] 
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,  // i to be case insensitive
        type: 'asset',// General asset type let webpack decide either asset/resource or asset/inline  default rule ifFile > 8kb asset/resource ifFile < 8kb asset/inline
        parser: {
          dataUrlCondition: { // Set size configuration on what will webpack select either asset/resource or asset/inline
            maxSize: 10 * 1024 // 3 kilobytes
          }
        }        
      },
      {
        test: /\.txt/,
        type: 'asset/source' // Reads .txt file contents and returns contents as  javascript string
      },
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
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
            plugins:[ "@babel/plugin-proposal-class-properties"]
          }
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",         
        },
      },
      {
        test: /\.hbs$/,
        use: ['handlebars-loader'],
      },
    ]
  },
  plugins : [
    new TerserPlugin(), // minimize bundle.js
    new MiniCssExtractPlugin({
      // bundles css file
      // filename: "CSSBundle.css", // purpose of contentHash is for browser caching purposes

      filename: "[name].[contenthash].css", // purpose of contentHash is for browser caching purposes
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*', //format for deleting files and subfolders default locations is based on output path
        path.join(process.cwd(), 'build/**/*') // format for deleting files on other folders 
      ]
    }),
    new HtmlWebpackPlugin({
      //#region generates index.html file inside folder declared earlier on output
      title: "Custom Title",
      filename:"index.html", //default is index.html use filename just incase of MPA 
      chunks: ['bundle'],// defines which bundle to put on html generally used for MPA ref is naming in entry obj
      meta: {
        description: "Some Description",
        random1: "Another Description"
      },
      personalDescription: "My Personal Description",
      template: "template.hbs", //would still generate index.html even without template this is just for further customization
      //#endregion
      favicon: 'src/assets/public/favicon.ico',
      // minify: true
    }),

  ]  
}