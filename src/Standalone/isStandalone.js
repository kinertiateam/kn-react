export default function() {
  const isStandaloneIos = window.navigator.standalone == true;
  const isStandAloneChrome = window.matchMedia('(display-mode: standalone)').matches;
  return isStandaloneIos || isStandAloneChrome;
}