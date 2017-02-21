/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

// Note: this file does not exist after ejecting.

const fs = require('fs');
const paths = require('../config/paths');

module.exports = (resolve, rootDir, isEjecting) => {
  // Use this instead of `paths.testsSetup` to avoid putting
  // an absolute filename into configuration after ejecting.
  const setupTestsFile = fs.existsSync(paths.testsSetup) ? '<rootDir>/src/setupTests.js' : undefined;

  // TODO: I don't know if it's safe or not to just use / as path separator
  // in Jest configs. We need help from somebody with Windows to determine this.
  const config = {
    moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
    setupFiles: [resolve('config/polyfills.js')],
    setupTestFrameworkScriptFile: setupTestsFile,
    testPathIgnorePatterns: [
      '<rootDir>[/\\\\](build|docs|node_modules|scripts)[/\\\\]'
    ],
    testEnvironment: 'node',
    testRegex: '/(__tests__/.*|src/.*\\.(test|spec))\\.(js|jsx|ts|tsx)$',
    testURL: 'http://localhost',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': isEjecting ?
        '<rootDir>/node_modules/babel-jest'
        : resolve('config/jest/babelTransform.js'),
      '^.+\\.(styl|sass|scss|less|css)$': resolve('config/jest/cssTransform.js'),
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': resolve('config/jest/fileTransform.js'),
    },
    transformIgnorePatterns: [
      '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$'
    ],
    moduleNameMapper: {
      '^react-native$': 'react-native-web'
    }
  };
  if (rootDir) {
    config.rootDir = rootDir;
  }
  return config;
};
