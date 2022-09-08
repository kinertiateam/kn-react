export default credentials => ({
  'Authorization': `Bearer ${ credentials.authToken }`
});