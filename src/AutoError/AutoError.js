import log from '../Log/log';

export default class AutoError extends Error {
  constructor(name, message, options = {}){
    options = options || {};
    super(JSON.stringify(message));
    this.name = name;
  }

  static catch(error){
    log(error.stack);
    const handler = this[`on${error.name}`];
    return handler ? handler(error) : null;
  }
}
