var webpack = require('webpack'),
  path = require('path');
var AngularInjectorPlugin = require('webpack-angular-injector-plugin');

module.exports = {
  debug: true,
  entry: {
    main: './www/index.js'
  },
  output: {
    path: path.join(__dirname, 'www'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      // {test: /\.html$/, loader: 'raw'},
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['ng-annotate']
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      {
        test: /\.less$/,
        loader: "style!css!less"
      }
    ]
  }
  ,
  devtool : 'source-map'
  //,
  //plugins: [
  //  new AngularInjectorPlugin({
  //    exclude: /fixture/
  //  })
  //]
};
