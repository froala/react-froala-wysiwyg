import React from 'react';
import FroalaEditorFunctionality from './FroalaEditorFunctionality.jsx';

class FroalaEditor extends FroalaEditorFunctionality {
  render () {
    return <this.tag ref="el">{this.props.children}</this.tag>;
  }
}

module.exports = FroalaEditor;