import React from 'react';
import FroalaEditorFunctionality from './froalaEditorFunctionality.js';

var FroalaEditorInput = React.createClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      <input ref='el'/>
    );
  }
});

export default FroalaEditorInput;