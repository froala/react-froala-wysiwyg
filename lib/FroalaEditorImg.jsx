var React = require('react');
var FroalaEditorFunctionality = require('./FroalaEditorFunctionality.jsx');

var FroalaEditorImg = React.createClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      <img ref='el'/>
    );
  }
});

module.exports = FroalaEditorImg;