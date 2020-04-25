function cacheFunction(input) {
  let cachedResult = {};

  return function(param) {
    if(cachedResult.hasOwnProperty(param)) {
      return cachedResult[param];
    } else {
      cachedResult[param] = input(param);
      return cachedResult[param];
    }
  }
}

export {
  cacheFunction,
};
