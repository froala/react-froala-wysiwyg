'use client';

import React from 'react';

export default class FroalaEditorView extends React.Component {

  constructor(props) {
    super(props)

    this.defaultTag = 'div';
  }

  getTrustedHtml () {
    return {__html: this.props.model};
  }

  render () {
    this.tag = this.props.tag || this.defaultTag;
    return (
      <this.tag className='fr-view' dangerouslySetInnerHTML={this.getTrustedHtml()}></this.tag>
    );
  }
}

// The build exports this class itself (webpack library.export 'default');
// this keeps require(...).default working for existing CommonJS code.
FroalaEditorView.default = FroalaEditorView;
