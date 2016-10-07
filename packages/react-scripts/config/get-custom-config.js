const customizers = require('./customizers');

function getCustomConfig(prod) {
  prod = prod || false;
  const env = {};

  const customizerKeys = customizers.keys();

  customizerKeys.forEach ((customizerKey) => {
    const value = process.env['REACT_APP_' + customizerKey];
    env[customizerKey] = value === 'true' || value === 'TRUE';
  });

  const result = customizerKeys.reduce((finalConfig, customizerKey) => {
      const customizer = customizers[customizerKey];
      if (customizer.prod === false && prod === true) {
        return finalConfig;
      }

      if (env[customizerKey]) {
        if (customizer.toArray) {
          const getCustomizer = (prod ? customizer.getProd : customizer.getDev) || customizer.getDev;
          finalConfig[customizer.toArray].push(getCustomizer(env));
        }
        finalConfig.values[customizerKey] = customizer.config || true;
      }
      return finalConfig;
    }, {
      presets: [],
      babelPlugins: [],
      plugins: [],
      loaders: [],
      values: {}
    });

  return result;
}

module.exports = getCustomConfig;
