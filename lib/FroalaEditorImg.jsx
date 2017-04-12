var React = require('react');
var createReactClass = require('create-react-class');
var FroalaEditorFunctionality = require('./FroalaEditorFunctionality.jsx');

var FroalaEditorImg = createReactClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      <img ref='el'/>
    );
  }
});

module.exports = FroalaEditorImg;