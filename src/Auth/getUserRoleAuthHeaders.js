export default params => {
  if( !params ){
    return {};
  }

  const { authHeaders, currentUserRoleId, trueUserRoleId } = ( params || {} );

  if(
    !(
      authHeaders &&
      currentUserRoleId &&
      trueUserRoleId
    )
  ){
    return;
  }


  return {
    ...authHeaders,
    'current-user-role-id': currentUserRoleId,
    'true-user-role-id': trueUserRoleId,
  }
}