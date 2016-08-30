
var FroalaEditor = React.createClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {

    this.onRender();
    return (
      <this.tag ref='jqueryElement'></this.tag>
    );
  }
});