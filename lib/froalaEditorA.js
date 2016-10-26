import React from 'react';
import FroalaEditorFunctionality from './froalaEditorFunctionality.js';

var FroalaEditorA = React.createClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      <a ref='el'>{this.props.children}</a>
    );
  }
});

export default FroalaEditorA;