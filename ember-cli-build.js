'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
  });

  // return app.toTree();
  // Using embroider so sourcemaps work
  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    packagerOptions: {
      webpackConfig: {
        devtool: 'source-map', // highest fidelity (and slowest)
      },
    },
  });
};
