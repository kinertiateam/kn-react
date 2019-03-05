import React, { Component } from 'react'

import { format, usStatesDict } from 'kn-react';

export default class App extends Component {
  render () {
    return (
      <div>
        {format.commas(10203)}
        {
          Object.keys(usStatesDict).map(abb => {
            return (
              <p>{abb} --> {usStatesDict[abb]}</p>
            )
          })
        }
      </div>
    )
  }
}
