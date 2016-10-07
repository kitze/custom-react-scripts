var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  'BABEL_STAGE_0': {
    toArray: 'presets',
    getDev: function () {
      return require.resolve('babel-preset-stage-0')
    }
  },
  'DECORATORS': {
    toArray: 'babelPlugins',
    getDev: function () {
      return require.resolve('babel-plugin-transform-decorators-legacy')
    }
  },
  'SASS': {
    toArray: 'loaders',
    getDev: function () {
      return {
        test: /(\.scss|\.sass)$/,
        loader: "style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss"
      }
    },
    getProd: function () {
      return {
        test: /(\.scss|\.sass)$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&-autoprefixer&importLoaders=1!postcss')
      }
    }
  },
  'LESS': {
    toArray: 'loaders',
    getDev: function () {
      return {
        test: /\.less$/,
        loader: "style!css!postcss!less"
      }
    },
    getProd: function () {
      return {
        test: /\.less/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
      }
    }
  },
  'STYLUS': {
    toArray: 'loaders',
    getDev: function () {
      return {
        test: /\.styl/,
        loader: 'style!css!postcss!stylus'
      }
    },
    getProd: function () {
      return {
        test: /\.styl/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!stylus')
      }
    }
  },
  'CSS_MODULES': {
    config: {
      dev: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss',
      prod: 'style!css?modules&-autoprefixer&importLoaders=1!postcss'
    }
  }
}
t('style', 'css!postcss!stylus')
            }
        }
    },
    'CSS_MODULES': {
        config: {
            dev: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss',
            prod: 'style!css?modules&-autoprefixer&importLoaders=1!postcss'
        }
    }
}

