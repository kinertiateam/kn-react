import { toCamelCase, toSnakeCase } from '../JsConvertCase/JsConvertCase';

export default class JsonModel {

  static modelFromJSON(model, json){
    for (let k in json){
      let v = json[k];
      if ((k.endsWith('_at') || k.endsWith('_on')) && v) {
        v = new Date(v);
      }

      model[ toCamelCase(k) ] = v;
    }

    return model;
  }


  static modelToJSON(model, excludedKeys = []){
    const json = {};

    for (let k in model){
      if (excludedKeys.includes(k))
        continue;
      json[ toSnakeCase(k) ] = model[k];
    }

    return json;
  }

}