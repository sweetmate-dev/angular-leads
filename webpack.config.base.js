var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToNg = path.resolve(node_modules, 'angular/angular.min.js');
var pathToNgMaterial = path.resolve(node_modules, 'angular-material/angular-material.min.js');
var pathToNgAnimate = path.resolve(node_modules, 'angular-animate/angular-animate.min.js');
var pathToUiRouter = path.resolve(node_modules, 'angular-ui-router/release/angular-ui-router.min.js');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  resolve: {
    alias: {
      'ngMaterial.css': path.resolve(node_modules, 'angular-material/angular-material.min.css')
    }
  },
  output: {

  },
  module: {
    loaders: [
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url?limit=100000' },
      { test: /\.js$/, loader: 'babel?optional[]=runtime&stage=0', exclude: [/node_modules/] },
      { test: /\.styl$/, loader: 'style!css!stylus' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.html$/, loader: 'raw' }
    ],

    noParse: [pathToNgAnimate, pathToNg, pathToUiRouter, pathToNgMaterial]
  },

  stylus: {
    use: [require('jeet')(), require('rupture')()]
  }
};
