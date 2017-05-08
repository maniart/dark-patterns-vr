import { createServer } from 'http';
import express from 'express';
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");


var compiler = webpack(webpackConfig);

// Create the `express` app
// Setup static assets serving
const app = express()
  .use(express.static(`${__dirname}/src`))
  .use('/aframe.js', express.static('./node_modules/aframe/build/aframe.js'))
  .use('/aframe-extras.min.js', express.static('./node_modules/aframe-extras/dist/aframe-extras.min.js'))
  .use('/aframe-inspector.min.js', express.static('./node_modules/aframe-inspector/dist/aframe-inspector.min.js'))
  .use('/bundle.js', express.static(`${__dirname}/public/build/bundle.js`))
  .use(webpackDevMiddleware(compiler, {
    publicPath: "/" // Same as `output.publicPath` in most cases.
  }));

// Create http server and listen
const server = createServer(app)
  .listen(7878, () => {
    console.log(`
      dark patterns is running on 7878
    `);
  });
