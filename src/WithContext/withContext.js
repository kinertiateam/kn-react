import React from 'react';


const withContext = function(Contexts, Component){
  Component = arguments[arguments.length - 1];
  Contexts = [];
  for (var i = 0; i < arguments.length - 1; i++){
    Contexts.push(arguments[i]);
  }

  return props => {
    return nestContexts(Contexts, Component, props)
  };
}


const nestContexts = function(Contexts, Component, props, mergedContexts){
  const Context = Contexts[0];
  mergedContexts = mergedContexts || {};

  return (
    <Context.Consumer>
      { context => {
        mergedContexts = { ...mergedContexts, ...context };
        if (Contexts.length === 1){
          return <Component {...Object.assign({}, props, mergedContexts)} />;
        }
        else {
          return nestContexts(Contexts.slice(1), Component, props, mergedContexts);
        }
      }}
    </Context.Consumer>
  );
}

export default withContext;

// export default props => {
//   return (
//     <AuthContext>
//       { context => <AuthGuard {...Object.assign({}, props, context)} /> }
//     </AuthContext>
//   )
// }