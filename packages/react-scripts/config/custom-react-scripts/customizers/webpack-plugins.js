const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  WEBPACK_DASHBOARD: {
    get: isDev => isDev && new DashboardPlugin(),
  },

  WEBPACK_DLL_REFERENCE: {
    get: isDev => {
      // handled by hot reloader on dev
      if (isDev) return;
      const DllReferencePlugin = require('webpack').DllReferencePlugin;

      // Read the dllReference configuration from package.json
      const paths = require('../../paths');
      const dllRefs = require(paths.appPackageJson).dllReference;
      if (!dllRefs || !dllRefs.length) return;

      return dllRefs.map(dll => {
        return new DllReferencePlugin(
          Object.assign(
            {
              context: paths.appPath,
            },
            dll
          )
        );
      });
    },
  },

  WEBPACK_AUTODLL_PLUGIN: {
    get: () => {
      const AutoDllPlugin = require('autodll-webpack-plugin').default;
      // Read the dll configuration from package.json
      const paths = require('../../paths');
      const dllConfig = require(paths.appPackageJson).dll || { entry: {} };
      if (!dllConfig.entry || Object.keys(dllConfig.entry).length === 0) return;

      return new AutoDllPlugin(
        Object.assign(
          {
            context: paths.appPath,
            path: './dll',
            filename: '[name].js',
            inject: true,
          },
          dllConfig
        )
      );
    },
  },
};
