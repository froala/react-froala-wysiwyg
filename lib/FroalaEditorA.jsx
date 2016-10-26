var React = require('react');
var FroalaEditorFunctionality = require('./FroalaEditorFunctionality.jsx');

var FroalaEditorA = React.createClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      <a ref='el'>{this.props.children}</a>
    );
  }
});

module.exports = FroalaEditorA;