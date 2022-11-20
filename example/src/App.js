import React, { Component } from 'react';
import Moment from 'moment';

import { stringifyParamsObject, randomString, format, ScrollTo, enumerateTimeBetweenMoments, EntityAnalysisPhraseTrie, log, bounce } from 'kn-react';

const BOUNCE_DIV_ID = 'bounce-div';
export default class App extends Component {
  componentDidMount = () => {
    this.stopBounce = bounce(
      BOUNCE_DIV_ID,
      { initialWaitTimeoutMilliseconds: 2 * 1000 }
    );
  }



  stopBounceCallback = () => {
    window.alert('bounce stopped');
  }



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

    // const startMoment = Moment('06/02/2020');
    // const endMoment = Moment('07/18/2020');

    // // log('moments', enumerateTimeBetweenMoments(startMoment, endMoment, 'day', 'day'))
    // log('moments', enumerateTimeBetweenMoments(startMoment, endMoment, 'month', 'month'))


    const trie = new EntityAnalysisPhraseTrie();
    log('trie', trie)

    return(
      <div>
        Check logs

        <div style={{ width: '95vw', height: '95vh', position: 'relative' }} >
          <div
            id={BOUNCE_DIV_ID}
            style={{ backgroundColor: 'red', width: 50, height: 50, position: 'absolute', bottom: 0, left: 20 }}
          />

          <button onClick={() => this.stopBounce( this.stopBounceCallback )}>
            Stop bouncing
          </button>
        </div>
      </div>
    )
  }
}
