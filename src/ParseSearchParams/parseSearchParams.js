export default (searchParamsString) => {
  searchParamsString = searchParamsString.replace(/^\?/,'');
  const searchParams = {};
  searchParamsString.split('&').forEach(s => {
    const split = s.split('=');
    searchParams[split[0]] = decodeURIComponent(split[1]);
  })
  return searchParams;
}