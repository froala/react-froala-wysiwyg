'use client';

import FroalaEditorFunctionality from './FroalaEditorFunctionality.jsx';
import React from 'react';

export default class FroalaEditorA extends FroalaEditorFunctionality {

  render () {
    return (
      <a ref={el => this.el = el}>{this.props.children}</a>
    );
  }
}

// The build exports this class itself (webpack library.export 'default');
// this keeps require(...).default working for existing CommonJS code.
FroalaEditorA.default = FroalaEditorA;
