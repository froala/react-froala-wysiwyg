'use client';

import FroalaEditorFunctionality from './FroalaEditorFunctionality.jsx';
import React from 'react';

export default class FroalaEditorButton extends FroalaEditorFunctionality {

  render () {
    return (
      <button ref={el => this.el = el}>{this.props.children}</button>
    );
  }
}

// The build exports this class itself (webpack library.export 'default');
// this keeps require(...).default working for existing CommonJS code.
FroalaEditorButton.default = FroalaEditorButton;
