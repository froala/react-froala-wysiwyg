
var FroalaEditorButton = React.createClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      <button ref='el'>{this.props.children}</button>
    );
  }
});