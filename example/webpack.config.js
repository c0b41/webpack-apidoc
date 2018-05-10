const webpack = require('webpack');
const Apidoc = require('../dist');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  entry: `${SRC_DIR}/index.js`,
  output: {
    path: `${OUTPUT_DIR}`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js?$/, use: [
        { loader: 'babel-loader' }
      ]}
    ]
  },
  plugins: [
    new Apidoc({
        src: './src',
        dest: './doc'
    })
  ],
  target: "web",
  mode: 'development'
}