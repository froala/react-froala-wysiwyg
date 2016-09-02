
var FroalaEditorA = React.createClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      <a ref='el'>{this.props.children}</a>
    );
  }
});