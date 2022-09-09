/*global window*/

const debug = (
  typeof window !== 'undefined' ?
    window.location.hostname.indexOf('localhost') >= 0 || window.REACT_DEBUG
  :
    false
);


export default function() {
  if(debug){
    console.log.apply(null, arguments);
  }
}