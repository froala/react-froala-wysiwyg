import React from 'react';
import FroalaEditorFunctionality from './FroalaEditorFunctionality.jsx';

class FroalaEditorImg extends FroalaEditorFunctionality {
  render () {
    return (
      <img ref='el'/>
    );
  }
}

module.exports = FroalaEditorImg;