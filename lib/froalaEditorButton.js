
var FroalaEditorButton = React.createClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {

    this.onRender();
    return (
      <button ref='jqueryElement'></button>
    );
  }
});