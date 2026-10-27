'use client';

import FroalaEditorFunctionality from './FroalaEditorFunctionality.jsx';
import React from 'react';

export default class FroalaEditorImg extends FroalaEditorFunctionality {
  render () {
    return (
      <img ref={el => this.el = el}/>
    );
  }
}

// The build exports this class itself (webpack library.export 'default');
// this keeps require(...).default working for existing CommonJS code.
FroalaEditorImg.default = FroalaEditorImg;
