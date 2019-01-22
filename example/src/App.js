import React, { Component } from 'react'

import KnReact from 'kn-react';

export default class App extends Component {
  render () {
    return (
      <div>
        { KnReact.format.commas(10203)}
      </div>
    )
  }
}
