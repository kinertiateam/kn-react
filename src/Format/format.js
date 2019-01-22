import * as d3Format from 'd3-format';
import * as d3TimeFormat from 'd3-time-format';

export function money (d, options = {}){
  options.decimals = options.decimals === undefined ? 2 : options.decimals;
  return isNaN(d) ? '' : d3Format.format(`$,.${options.decimals}f`)(d);
}

export function percent (d){
  return isNaN(d) ? '' : d3Format.format('.1%')(d);
}

export function commas (d){
  return isNaN(d) ? '' : d3Format.format(',.0f')(d);
}

export function date (d){
  return ! d instanceof Date ? '' : d3TimeFormat.timeFormat('%Y-%m-%d')(d);
}

export function phone (tenDigitPhone){
    if(!tenDigitPhone) return;

    if(tenDigitPhone.length > 6)
      return `${tenDigitPhone.slice(0,3)}-${tenDigitPhone.slice(3,6)}-${tenDigitPhone.slice(6)}`;
    else if(tenDigitPhone.length > 3)
      return `${tenDigitPhone.slice(0,3)}-${tenDigitPhone.slice(3)}`;
    else
      return tenDigitPhone;
}

export function duration (seconds){
  let hh = Math.floor(seconds / 3600);
  let mm = Math.floor((seconds - (hh * 3600)) / 60);
  let ss = Math.floor(seconds - (hh * 3600) - (mm * 60));

  if (hh < 10) {hh = "0"+hh;}
  if (mm < 10) {mm = "0"+mm;}
  if (ss < 10) {ss = "0"+ss;}

  const mmss = mm + ':' + ss;
  return hh == '00' ? mmss : hh + ':' + mmss;
}