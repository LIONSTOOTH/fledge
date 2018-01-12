const path = require('path');
const webpack = require('webpack');
require('dotenv').config();

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
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
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
        loader: ['style', 'css'],
      },
    ],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.GOOGLE_API_KEY': JSON.stringify(process.env.GOOGLE_API_KEY),
      'process.env.GOOGLE_CLIENT_ID': JSON.stringify(process.env.GOOGLE_CLIENT_ID),
    }),
  ],
};
