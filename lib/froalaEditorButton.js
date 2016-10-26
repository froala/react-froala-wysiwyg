import React from 'react';
import FroalaEditorFunctionality from './froalaEditorFunctionality.js';

var FroalaEditorButton = React.createClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      <button ref='el'>{this.props.children}</button>
    );
  }
});

export default FroalaEditorButton;