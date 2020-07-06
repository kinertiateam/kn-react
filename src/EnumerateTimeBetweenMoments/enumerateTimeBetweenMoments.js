import moment from 'moment';


export default (startMoment, endMoment, startTime='day', addTime='days') => {
  let currentMoment = startMoment.clone().startOf(startTime);
  const lastDate = endMoment.clone().startOf(startTime);

  const days = [ startMoment.clone() ];

  while( currentMoment.add(1, addTime).diff(lastDate) < 0 ) {
    days.push( moment( currentMoment.toDate() ));
  }

  if( days[days.length - 1].diff(lastDate) < 0 ){
    days.push(endMoment.clone());
  }

  return days;
};