const debug = window.location.hostname.indexOf('localhost') >= 0 || window.REACT_DEBUG;

export default function() {
  if(debug){
    console.log.apply(null, arguments);
  }
}