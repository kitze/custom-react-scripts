module.exports = () => isDev => {
  return {
    test: /\.ya?ml$/,
    use: [
      {
        loader: 'json-loader',
      },
      {
        loader: 'yaml-loader',
      },
    ],
  };
};
