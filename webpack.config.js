const path = require('path');

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
  resolve: { 
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    loaders: [
    {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[hash]-[name].[ext]'
          }
        }]
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: ['transform-decorators-legacy'],
          presets: ['react', 'es2015', 'stage-1'],
        },
      },
      {
        test: /\.css$/,
        loader: ["style", "css"]
      },
    ],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
};