const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cesiumSource = "node_modules/cesium/Build/Cesium/";
const cesiumBaseUrl = "cesiumStatic";

module.exports = {
  
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.wasm$/,
        type: 'webassembly/async', // Tells Webpack to treat it as an async WebAssembly module
      }
    ]
     
  },

  experiments: {
    asyncWebAssembly: true,
  },

  plugins: [
    
    new HtmlWebpackPlugin({
      template: './src/index.html',  // Point to the new index.html location
      filename: 'index.html',  // Output filename in dist
    })    
    
  ],
  
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 9000,
    hot: true, // Enable HMR
    client: {
      overlay: {
        warnings: false, // Disable warning overlay in the browser
        errors: true,
      },
    },
  },
  mode: 'development'
};
