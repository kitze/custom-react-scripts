module.exports = () => isDev => {
  return {
    test: /\.svg$/,
    use: [
      {
        loader: '@adsk/bim360-svg-store-transform-loader',
      },
      {
        loader: 'svgo-loader',
        options: require('./svgo.plugins'),
      },
    ],
  };
};
