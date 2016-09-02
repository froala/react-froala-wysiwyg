
var FroalaEditor = React.createClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      <this.tag ref='el'>{this.props.children}</this.tag>
    );
  }
});