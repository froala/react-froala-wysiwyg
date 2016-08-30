
var FroalaEditorFunctionality = {

  defaultTag: 'div',

  onRender() {
    this.tag = this.props.tag || this.defaultTag;
  },

  componentDidMount() {
    this.createEditor();
  },

  createEditor: function() {
    this._editor = $(this.refs.jqueryElement).froalaEditor(this.props.config);
  }
};