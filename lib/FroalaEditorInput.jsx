var React = require('react');
var createReactClass = require('create-react-class');
var FroalaEditorFunctionality = require('./FroalaEditorFunctionality.jsx');

var FroalaEditorInput = createReactClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      <input ref='el'/>
    );
  }
});

module.exports = FroalaEditorInput;