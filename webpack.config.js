var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, '../.build/app');
var APP_DIR = path.resolve(__dirname, 'client/app/app.tsx');

console.log(APP_DIR)

var config = {
    devtool: 'inline-source-map',
    entry: APP_DIR,
    output: {
      filename: 'app.js'
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: 'ts-loader' }
      ]
    }
  }

module.exports = config;