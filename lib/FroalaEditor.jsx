'use client';

import FroalaEditorFunctionality from './FroalaEditorFunctionality.jsx';
import React from 'react';

export default class FroalaEditor extends FroalaEditorFunctionality {
  render () {
    return <this.tag ref={el => this.el = el}>{this.props.children}</this.tag>;
  }
}

// The build exports this class itself (webpack library.export 'default');
// this keeps require(...).default working for existing CommonJS code.
FroalaEditor.default = FroalaEditor;
