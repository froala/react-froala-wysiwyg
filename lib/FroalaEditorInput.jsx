import React from 'react';
import FroalaEditorFunctionality from './FroalaEditorFunctionality.jsx';

class FroalaEditorInput extends FroalaEditorFunctionality {

  render () {
    return (
      <input ref='el'/>
    );
  }
}

module.exports = FroalaEditorInput;