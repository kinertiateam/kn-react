import React, { Component } from 'react';
import Moment from 'moment';

import { stringifyParamsObject, randomString, format, ScrollTo, enumerateTimeBetweenMoments } from 'kn-react';

export default class App extends Component {
  render () {

    // const paramsObject = {
    //   param1: 'abc',
    //   param2: 123,
    //   param3: 'alex',
    //   param4: 'peltier'
    // }

    // const date = format.dateTime((new Date()),false);
    // const date2 = format.dateTime((new Date()),true);

    // return (
    //   <div>
    //     { randomString() },{ date }, { date2 }
    //   </div>
    // )

    const startMoment = Moment('06/02/2020');
    const endMoment = Moment('07/18/2020');

    // console.log('moments', enumerateTimeBetweenMoments(startMoment, endMoment, 'day', 'day'))
    console.log('moments', enumerateTimeBetweenMoments(startMoment, endMoment, 'month', 'month'))

    return(
      <div>
        Check logs
      </div>
    )
  }
}
