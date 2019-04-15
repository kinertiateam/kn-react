import React from 'react';


const withProvider = function(Providers, Component){
  Component = arguments[arguments.length - 1];
  Providers = [];
  for (var i = 0; i < arguments.length - 1; i++){
    Providers.push(arguments[i]);
  }

  return props => nestProviders(Providers, Component);
}


const nestProviders = function(Providers, Component){
  const Provider = Providers[0];

  return (
    <Provider>
      { Providers.length === 1 ? <Component/> : nestProviders(Providers.slice(1), Component) }
    </Provider>
  );
}

export default withProvider;
