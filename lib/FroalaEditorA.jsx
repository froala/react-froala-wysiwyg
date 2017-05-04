var React = require('react');
var createReactClass = require('create-react-class');
var FroalaEditorFunctionality = require('./FroalaEditorFunctionality.jsx');

var FroalaEditorA = createReactClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      <a ref='el'>{this.props.children}</a>
    );
  }
});

module.exports = FroalaEditorA;