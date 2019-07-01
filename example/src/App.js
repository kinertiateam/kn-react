import React, { Component } from 'react'

import { stringifyParamsObject, randomString, format } from 'kn-react';

export default class App extends Component {
  render () {

    const paramsObject = {
      param1: 'abc',
      param2: 123,
      param3: 'alex',
      param4: 'peltier'
    }

    const date = format.dateTime((new Date()).getDate());

    return (
      <div>
        { randomString() },{ date }
      </div>
    )
  }
}
