/**
 + * Copyright (c) 2015-present, Facebook, Inc.
 + * All rights reserved.
 + *
 + * This source code is licensed under the BSD-style license found in the
 + * LICENSE file in the root directory of this source tree. An additional grant
 + * of patent rights can be found in the PATENTS file in the same directory.
 + */

let path = require('path');
let paths = require('./paths');

let getCustomConfig = require('./get-custom-config');
let customConfig = getCustomConfig(true);

module.exports = {
  // when TypeScript emits a file, pass it to Babel to provide backwards compatibility
  useBabel: true,
  // babel options to use
  babelOptions: {
    babelrc: false,
    presets: [require.resolve('babel-preset-react-app')].concat(customConfig.presets),
    plugins: [].concat(customConfig.babelPlugins)
  },
  // tell the loader where the path is
  babelCore: path.join(paths.appNodeModules, 'babel-core')
};
