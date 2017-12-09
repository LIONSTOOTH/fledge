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
          query: {
            presets: ['react', 'es2015']
          }
      }
    ]
  }
}