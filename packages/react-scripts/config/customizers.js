const ExtractTextPlugin = require('extract-text-webpack-plugin');

function getCssLoader(type, env) {
  if (env['CSS_MODULES']) {
    const conf = {
      dev: 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss',
      prod: 'css?modules&-autoprefixer&importLoaders=1!postcss'
    }
    return conf[type];
  } else {
    return 'css!postcss';
  }
}

module.exports = {
  'BABEL_STAGE_0': {
    toArray: 'presets',
    getDev: function (env) {
      return require.resolve('babel-preset-stage-0')
    }
  },
  'DECORATORS': {
    toArray: 'babelPlugins',
    getDev: function (env) {
      return require.resolve('babel-plugin-transform-decorators-legacy')
    }
  },
  'SASS': {
    toArray: 'loaders',
    getDev: function (env) {
      return {
        test: /(\.scss|\.sass)$/,
        loader: ['style!', getCssLoader('dev', env), '!sass'].join('')
      }
    },
    getProd: function (env) {
      return {
        test: /(\.scss|\.sass)$/,
        loader: ExtractTextPlugin.extract('style', getCssLoader('prod', env) + '!sass')
      }
    }
  },
  'LESS': {
    toArray: 'loaders',
    getDev: function (env) {
      return {
        test: /\.less$/,
        loader: ['style!', getCssLoader('dev', env), '!less'].join('')
      }
    },
    getProd: function (env) {
      return {
        test: /\.less/,
        loader: ExtractTextPlugin.extract('style', getCssLoader('prod', env) + '!less')
      }
    }
  },
  'STYLUS': {
    toArray: 'loaders',
    getDev: function (env) {
      return {
        test: /\.styl/,
        loader: ['style!', getCssLoader('dev', env), '!stylus'].join('')
      }
    },
    getProd: function (env) {
      return {
        test: /\.styl/,
        loader: ExtractTextPlugin.extract('style', getCssLoader('prod', env) + '!stylus')
      }
    }
  },
  'CSS_MODULES': {
    config: {
      dev: 'style!' + getCssLoader('dev', {'CSS_MODULES': true}),
      prod: 'style!' + getCssLoader('prod', {'CSS_MODULES': true})
    }
  }
}
