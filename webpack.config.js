var path = require('path');
var CleanPlugin = require('clean-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './scripts/index',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'scripts/game.js',
    sourceMapFilename: '[file].map'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel?presets[]=es2015'
    }]
  },
  plugins: [
    new CleanPlugin(['docs']),
    new CopyPlugin([{
      from: './static'
    }, {
      from: './assets',
      to: 'assets'
    }, {
      from: './external',
      to: 'scripts'
    }])
  ]
};
