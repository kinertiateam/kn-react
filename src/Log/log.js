const debug = window.location.hostname === 'localhost' || window.REACT_DEBUG;

export default function() {
  if(debug){
    console.log.apply(null, arguments);
  }
}