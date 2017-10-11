module.exports = (loader, test, exclude) => () => {
  return {
    test,
    exclude,
    use: [loader],
  };
};
