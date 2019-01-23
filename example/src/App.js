import React, { Component } from 'react'

import { format } from 'kn-react';

export default class App extends Component {
  render () {
    return (
      <div>
        {format.commas(10203)}
      </div>
    )
  }
}
