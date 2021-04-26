/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    addin: './src/Addin.tsx',
    commands: './src/commands.ts',
    outlookmock: './src/OutlookMock.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    clean: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      chunks: ['addin'],
      template: 'public/react.html',
      filename: 'addin.html'
    }),
    new HtmlWebPackPlugin({
      chunks: ['outlookmock'],
      template: 'public/react.html',
      filename: 'index.html'
    }),
    new HtmlWebPackPlugin({
      chunks: ['commands'],
      filename: 'commands.html'
    })
  ]
};
