import React from 'react';
import FroalaEditorFunctionality from './FroalaEditorFunctionality.jsx';

class FroalaEditorA extends FroalaEditorFunctionality {

  render () {
    return (
      <a ref='el'>{this.props.children}</a>
    );
  }
}

module.exports = FroalaEditorA;