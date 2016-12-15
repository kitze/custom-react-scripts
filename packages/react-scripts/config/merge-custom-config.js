var fs = require('fs');
var path = require('path');

function mergeCustomConfig(config) {
  var customConfigPath = path.resolve('./webpack.custom-config.js');
  if (fs.existsSync(customConfigPath)) {
    var customConfig = require(customConfigPath);
    Object.keys(customConfig).forEach(function (key) {
      if (config.hasOwnProperty(key) && typeof config[key] === 'object') {
        if (Array.isArray(config[key])) {
          if (Array.isArray(customConfig[key])) {
            config[key] = config[key].concat(customConfig[key]);
          } else {
            config[key].push(customConfig[key]);
          }
        } else {
          Object.assign(config[key], customConfig[key]);
        }
      } else {
        config[key] = customConfig[key];
      }
    });
  }
  return config;
}

module.exports = mergeCustomConfig;
