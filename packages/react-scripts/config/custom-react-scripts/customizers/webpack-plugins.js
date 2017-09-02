const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  WEBPACK_DASHBOARD: {
    get: () => new DashboardPlugin(),
  },
};
