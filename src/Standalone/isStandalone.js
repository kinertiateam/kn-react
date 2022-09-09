/*global window*/


export default function() {
  if( typeof window === 'undefined' ){
    return false;
  }


  const isStandaloneIos = window.navigator.standalone == true;
  const isStandAloneChrome = window.matchMedia('(display-mode: standalone)').matches;
  return isStandaloneIos || isStandAloneChrome;
}