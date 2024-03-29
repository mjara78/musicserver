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
  resolve: {
    modules: [
      path.resolve('./server/public/src'),
      path.resolve('./node_modules')
    ]
  },
  plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.EnvironmentPlugin(['NODE_ENV'])
    ] 
};