import { GRADES } from './opportunityConstants';


const GRADE_MAP = {};


GRADES.forEach((g, i) => {
  // Ensure the last value has a score of 0
  GRADE_MAP[ g ] = Object.keys( GRADES ).length - i - 1;
});


export default (opportunity, steps, mediaSteps) => {
  if( !( opportunity && steps && mediaSteps ) ){
    return;
  }


  const { additionalData } = opportunity;

  if( !(
    steps &&
    mediaSteps &&
    Array.isArray( additionalData )
  ) ){
    return;
  }


  const allSteps = (
    steps || []
  ).concat(
    mediaSteps || []
  );

  const grades = additionalData.map(
    d => {
      const step = allSteps.find(
        s => s.key === d.key
      );

      if(
        !step ||
        !step.shouldGrade ||
        Array.isArray( step.choices )
      ){
        return;
      }


      const choice = step.choices.find(
        c => c.label === d.value
      );

      if( !choice ){
        return;
      }


      return choice.grade;
    }
  ).filter(g => g);

  if(
    !Array.isArray( grades ) ||
    !grades.length
  ){
    return;
  }


  const gradeScores = grades.map(
    g => GRADE_MAP[ g ] || 0
  );

  const gradeScore = gradeScores.reduce((a, b) => a+b, 0) / gradeScores.length;

  return Object.keys( GRADE_MAP ).find(
    g => GRADE_MAP[ g ] === Math.round( gradeScore )
  );
}