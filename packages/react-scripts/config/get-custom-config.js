const customizers = require('./customizers');

function getCustomConfig(prod) {
  prod = prod || false;
  let env = {};

  customizerKeys = customizers.keys();

  customizerKeys.forEach ((customizerKey) => {
    let value = process.env['REACT_APP_' + customizerKey];
    env[customizerKey] = value === 'true' || value === 'TRUE';
  });

  var result = customizerKeys.reduce((finalConfig, customizerKey) => {
      let customizer = customizers[customizerKey];
      if (customizer.prod === false && prod === true) {
        return finalConfig;
      }

      if (env[customizerKey]) {
        if (customizer.toArray) {
          let getCustomizer = (prod ? customizer.getProd : customizer.getDev) || customizer.getDev;
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
