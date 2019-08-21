// Taken from js-convert-case which is not transpiled by CRA

export function toCamelCase(str) {
  if (!str) return '';

  return String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
    .replace(/[^A-Za-z0-9]+/g, '$')
    .replace(/([a-z])([A-Z])/g, (m, a, b) => `${a}$${b}`)
    .toLowerCase()
    .replace(/(\$)(\w)/g, (m, a, b) => b.toUpperCase());
}

export function toSnakeCase(str) {
  if (!str) return '';

  return String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
    .replace(/([a-z])([A-Z])/g, (m, a, b) => `${a}_${b.toLowerCase()}`)
    .replace(/[^A-Za-z0-9]+|_+/g, '_')
    .toLowerCase();
}

export function toPascalCase(str) {
  if (!str) return '';

  return String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '$')
    .replace(/[^A-Za-z0-9]+/g, '$')
    .replace(/([a-z])([A-Z])/g, (m, a, b) => `${a}$${b}`)
    .toLowerCase()
    .replace(/(\$)(\w?)/g, (m, a, b) => b.toUpperCase());
}

export function toDotCase(str) {
  if (!str) return '';

  return String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
    .replace(/([a-z])([A-Z])/g, (m, a, b) => `${a}_${b.toLowerCase()}`)
    .replace(/[^A-Za-z0-9]+|_+/g, '.')
    .toLowerCase();
}

export function toPathCase(str) {
  if (!str) return '';

  return String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
    .replace(/([a-z])([A-Z])/g, (m, a, b) => `${a}_${b.toLowerCase()}`)
    .replace(/[^A-Za-z0-9]+|_+/g, '/')
    .toLowerCase();
}

export function toTextCase(str) {
  if (!str) return '';

  return String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
    .replace(/([a-z])([A-Z])/g, (m, a, b) => `${a}_${b.toLowerCase()}`)
    .replace(/[^A-Za-z0-9]+|_+/g, ' ')
    .toLowerCase();
}

export function toSentenceCase(str) {
  if (!str) return '';

  const textcase = String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
    .replace(/([a-z])([A-Z])/g, (m, a, b) => `${a}_${b.toLowerCase()}`)
    .replace(/[^A-Za-z0-9]+|_+/g, ' ')
    .toLowerCase();

  return textcase.charAt(0).toUpperCase() + textcase.slice(1);
}

export function toHeaderCase(str) {
  if (!str) return '';

  return String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
    .replace(/([a-z])([A-Z])/g, (m, a, b) => `${a}_${b.toLowerCase()}`)
    .replace(/[^A-Za-z0-9]+|_+/g, ' ')
    .toLowerCase()
    .replace(/( ?)(\w+)( ?)/g, (m, a, b, c) => a + b.charAt(0).toUpperCase() + b.slice(1) + c);
}

const toUpperCase = str => String(str).toUpperCase();
const toLowerCase = str => String(str).toLowerCase();

export function lowerKeys(obj) {
  if (!obj) return null;

  const res = {};
  for (const key in obj) {
    res[String(key).toLowerCase()] = obj[key];
  }

  return res;
}

export function upperKeys(obj) {
  if (!obj) return null;

  const res = {};
  for (const key in obj) {
    res[String(key).toUpperCase()] = obj[key];
  }

  return res;
}

export function snakeKeys(obj) {
  if (!obj) return null;

  const res = {};
  for (const key in obj) {
    res[toSnakeCase(key)] = obj[key];
  }

  return res;
}

export function pascalKeys(obj) {
  if (!obj) return null;

  const res = {};
  for (const key in obj) {
    res[toPascalCase(key)] = obj[key];
  }

  return res;
}

export function camelKeys(obj) {
  if (!obj) return null;

  const res = {};
  for (const key in obj) {
    res[toCamelCase(key)] = obj[key];
  }

  return res;
}


export default {
  toCamelCase,
  toSnakeCase,
  toPascalCase,
  toDotCase,
  toPathCase,
  toTextCase,
  toSentenceCase,
  toHeaderCase,
  lowerKeys,
  upperKeys,
  snakeKeys,
  pascalKeys,
  camelKeys
}