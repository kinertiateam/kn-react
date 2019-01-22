import React from 'react';

export default props => (
  <div style={{ position: 'relative' }}>
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: props.maxWidth }}>
      { props.children }
    </div>
  </div>
)