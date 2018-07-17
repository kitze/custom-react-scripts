const DashboardPlugin = require('webpack-dashboard/plugin');
const InterpolateLoaderOptionsPlugin = require('interpolate-loader-options-webpack-plugin');

module.exports = {
  WEBPACK_DASHBOARD: {
    get: () => new DashboardPlugin(),
  },
  SVG: {
    default: true,
    get: () =>
      new InterpolateLoaderOptionsPlugin({
        loaders: [
          {
            name: 'svgo-loader',
            // 25 is the index of the cleanupIDs plugin in the plugins array.
            include: ['plugins.25.cleanupIDs.prefix'],
          },
        ],
      }),
  },
};
