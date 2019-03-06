import React, { Component } from 'react'
import moment from 'moment';

import { format, enumerateTimeBetweenMoments, log } from 'kn-react';

export default class App extends Component {
  render () {
  const moment1 = moment('8/1/18');
  const moment2 = moment()
  const moment3 = moment('2/25/19');
  const moment4 = moment()

  log('days',enumerateTimeBetweenMoments(moment1,moment2,'month','months'))
  log('days',enumerateTimeBetweenMoments(moment3,moment4,'day','days'))
    return (
      <div>
        {format.commas(10203)}
      </div>
    )
  }
}
