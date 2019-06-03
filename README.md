# kn-react

A library of useful code for react apps.

```bash
npm install --save git+https://github.com/kinertiateam/kn-react.git#359818a
```

```js
import { withContext } from 'kn-react';
import { SomeContext } from './SomeContext';

const thingWithContext = props => {
  return (
    <div>{ props.thingFromContext }</div>
  )
};

export default withContext( SomeContext, thingWithContext);
```


