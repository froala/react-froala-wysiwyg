var React = require('react');
var FroalaEditorFunctionality = require('./FroalaEditorFunctionality.jsx');

var FroalaEditor = React.createClass({
  mixins: [FroalaEditorFunctionality],
  render: function() {
    return <this.tag ref="el">{this.props.children}</this.tag>;
  }
});

module.exports = FroalaEditor;