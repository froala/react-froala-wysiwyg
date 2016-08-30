
var FroalaEditorFunctionality = {

  createEditor: function() {
    this._editor = $(this.refs.jqueryElement).froalaEditor(this.props.config);
  }
};