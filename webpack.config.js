var path = require('path'); 

const webpack = require('webpack');

module.exports = { 
  entry: './server/public/src/app.js', 
  output: { 
    filename: 'app.js', 
    path: path.resolve(__dirname, 'server/public/dist') 
  } ,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  /*plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ] */
};