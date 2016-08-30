
var FroalaEditorInput = React.createClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {

    this.onRender();
    return (
      <input ref='jqueryElement'/>
    );
  }
});