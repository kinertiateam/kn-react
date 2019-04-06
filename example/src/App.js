import React, { Component } from 'react'

import { stringifyParamsObject } from 'kn-react';

export default class App extends Component {
  render () {
  
    const paramsObject = {
      param1: 'abc',
      param2: 123,
      param3: 'alex',
      param4: 'peltier'
    }
    
    return (
      <div>
        { stringifyParamsObject(paramsObject) }
      </div>
    )
  }
}
