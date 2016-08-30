
var FroalaEditorImg = React.createClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {

    this.onRender();
    return (
      <img ref='jqueryElement'/>
    );
  }
});