import React from 'react';

export default class ScrollTo extends React.Component{
  render() {
    const props = {...this.props, id: (this.props.id || 'scroll-to')}
    return (
      <div {...props}/>
    );
  }

  static scroll(id='scroll-to'){
    const scrollTo = window.document.getElementById(id);
    if(scrollTo) {
      scrollTo.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }

}