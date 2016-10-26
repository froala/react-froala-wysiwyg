var React = require('react');
var FroalaEditorFunctionality = require('./FroalaEditorFunctionality.jsx');

var FroalaEditorButton = React.createClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      <button ref='el'>{this.props.children}</button>
    );
  }
});

module.exports = FroalaEditorButton;