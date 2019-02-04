import React from 'react';

export default props => {
  const styles = {
    ...(props.style || {}),
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: props.maxWidth,
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={styles}>
        { props.children }
      </div>
    </div>
  );
}