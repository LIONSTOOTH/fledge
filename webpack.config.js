const path = require('path');

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders : [
      {
          loader : 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['react', 'es2015', 'stage-0']
          }
      }
    ]
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
}