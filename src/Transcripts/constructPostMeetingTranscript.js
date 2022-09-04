export default meeting => {
  if(
    !meeting ||
    !meeting.transcriptApiResponse ||
    !meeting.transcriptApiResponse.results
  ){
    return '';
  }


  return meeting.transcriptApiResponse.results.map(
    r => r.alternatives[ 0 ].transcript
  ).join(' ');
}