var React = require('react');
var FroalaEditorFunctionality = require('./FroalaEditorFunctionality.jsx');

var FroalaEditorInput = React.createClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      <input ref='el'/>
    );
  }
});

module.exports = FroalaEditorInput;