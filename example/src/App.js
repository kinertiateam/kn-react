import React, { Component } from 'react'

import { stringifyParamsObject, randomString, format, ScrollTo } from 'kn-react';

export default class App extends Component {
  render () {

    const paramsObject = {
      param1: 'abc',
      param2: 123,
      param3: 'alex',
      param4: 'peltier'
    }

    const date = format.dateTime((new Date()),false);
    const date2 = format.dateTime((new Date()),true);

    return (
      <div>
        { randomString() },{ date }, { date2 }
      </div>
    )
  }
}
