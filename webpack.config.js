var path = require('path');
var CleanPlugin = require('clean-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

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
    new webpack.ProgressPlugin((percent, msg) => {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(msg); // end the line
    }),
    new CleanPlugin(['docs/scripts/game.js']),
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
