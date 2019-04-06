export default (paramsObject) => {
  const paramsArray = Object.keys(paramsObject).map(k => {
    return k + '=' + encodeURIComponent(paramsObject[k]);
  });
  return paramsArray.join('&');
}