emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



function trim(key){
  if(this.state[key]){
    this.setState({ [key]: this.state[key].trim() })
  }
}


function validate(state, validations){
  return new Promise(resolve => {

    const keys = Object.keys(validations);


    const invalid = (m) => {
      error.payload = m;
      throw new ValidationError(m);
    }


    for (let k in validations) {
      let validationArray = Array.isArray( validations[k] ) ? validations[k] : [ validations[k] ];
      const variable = state[k];

      let validation;
      for( let i in validationArray ){
        validation = validationArray[ i ];

        // Presence
        if(validation.presence && (!variable)){
          invalid(validation.presence.message);
        }

        // Length
        if(validation.length){
          if(validation.length.equalTo && variable.length != validation.length.equalTo){
            invalid(validation.length.message);
          } else if(validation.length.atLeast && variable.length < validation.length.atLeast){
            invalid(validation.length.message);
          } else if(validation.length.atMost && variable.length > validation.length.atMost){
            invalid(validation.length.message);
          }
        }

        //Pattern
        console.log('variable', variable);
        console.log('validation.regex', validation.regex);
        console.log('validation.regex.pattern.test(variable)', validation.regex.pattern.test(variable))
        if(validation.regex && !validation.regex.pattern.test(variable)){
          invalid(validation.regex.message);
        }

        // Email
        if(validation.email){
          if(!emailPattern.test(variable)) {
            invalid(validation.email.message);
          }
        }

        // Equal to
        if(validation.equalTo && variable != validation.equalTo.value){
          invalid(validation.equalTo.message);
        }
      }
    }

    return resolve(true);
  });
}

class ValidationError extends Error{
  constructor(message){
    super(message);
    this.name = 'ValidationError';
  }
}
error = new Error('validateError');




invalidByoSubdomain = {
  byoDomain: 'subdomain..domain.com'
};

domainRegex = '[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?';
tldRegex = '[a-zA-Z]{2,}';

selectedPlan = {
  baseSiteDomain: 'domain.com'
};

validByoSubdomainValidators = {
  byoDomain: [
    {
      regex: {
        pattern: new RegExp(`[^\.].${ selectedPlan.baseSiteDomain }$`),
        message: `Subdomain cannot end with a '.'.`
      }
    },
    {
      regex: {
        pattern: new RegExp(`^(${ domainRegex }\\.?)+.${ selectedPlan.baseSiteDomain }$`),
        message: `Please enter a valid subdomain.`
      }
    },
  ]
};




// validByoDomain = {
//   byoDomain: 'domain.com'
// }



validate(invalidByoSubdomain, validByoSubdomainValidators)