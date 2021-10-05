function cacheFunction(inputFn) {
  let cachedResult = {};

  return function(param) {
    if (cachedResult.hasOwnProperty(param)) {
      return cachedResult[param];
    } else {
      cachedResult[param] = inputFn(param);
      return cachedResult[param];
    }
  }
}

export {
  cacheFunction,
};
