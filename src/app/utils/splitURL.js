let splitURL = (sourceURL) => {
  if (sourceURL) {
      let targetURL = sourceURL;
      if (targetURL = targetURL.split('#')[1]) {
          if (targetURL = targetURL.split('?')[0]) {
              return targetURL;
          }
      } else {
        return '/';
      }
  } else {
    throw 'Missing argument sourceURL'
  }
}

export default splitURL;
