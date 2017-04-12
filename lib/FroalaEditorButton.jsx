var React = require('react');
var createReactClass = require('create-react-class');
var FroalaEditorFunctionality = require('./FroalaEditorFunctionality.jsx');

var FroalaEditorButton = createReactClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      <button ref='el'>{this.props.children}</button>
    );
  }
});

module.exports = FroalaEditorButton;