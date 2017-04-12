var React = require('react');
var createReactClass = require('create-react-class');
var FroalaEditorFunctionality = require('./FroalaEditorFunctionality.jsx');

var FroalaEditor = createReactClass({
  mixins: [FroalaEditorFunctionality],
  render: function() {
    return <this.tag ref="el">{this.props.children}</this.tag>;
  }
});

module.exports = FroalaEditor;