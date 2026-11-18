'use client';

import FroalaEditorFunctionality from './FroalaEditorFunctionality.jsx';
import React from 'react';

export default class FroalaEditorInput extends FroalaEditorFunctionality {

  render () {
    return (
      <input ref={el => this.el = el}/>
    );
  }
}

// The build exports this class itself (webpack library.export 'default');
// this keeps require(...).default working for existing CommonJS code.
FroalaEditorInput.default = FroalaEditorInput;
