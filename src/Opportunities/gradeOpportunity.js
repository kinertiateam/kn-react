const GRADE_MAP = {
  'A': 4,
  'B': 3,
  'C': 2,
  'D': 1,
  'F': 0,
};


export default (opportunity, steps, mediaSteps) => {
  if( !( opportunity && steps && mediaSteps ) ){
    return;
  }


  const { additionalData } = opportunity;

  if( !( steps && mediaSteps && additionalData ) ){
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

      if( !step || !step.shouldGrade ){
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

  if( !grades || !grades.length ){
    return;
  }


  const gradeScores = grades.map(
    g => GRADE_MAP[ g ]
  );

  const gradeScore = gradeScores.reduce((a, b) => a+b, 0) / gradeScores.length;

  return Object.keys( GRADE_MAP ).find(
    g => GRADE_MAP[ g ] === Math.round( gradeScore )
  );
}