const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve("src/index.jsx"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HTMLPlugin({
      template: path.resolve('./src/index.html')
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
}