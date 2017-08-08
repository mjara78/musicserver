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
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  },
  devtool: "inline-source-map"
};