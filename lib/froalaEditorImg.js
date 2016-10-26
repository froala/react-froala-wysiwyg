import React from 'react';
import FroalaEditorFunctionality from './froalaEditorFunctionality.js';

var FroalaEditorImg = React.createClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      <img ref='el'/>
    );
  }
});

export default FroalaEditorImg;