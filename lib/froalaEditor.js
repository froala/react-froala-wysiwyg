
var FroalaEditor = React.createClass({

  defaultTag: 'div',
  mixins: [FroalaEditorFunctionality],
  componentDidMount() {

    this.createEditor();
  },
  render: function() {

    this.tag = this.props.tag || 'div';

    return (
      <this.tag ref='jqueryElement'></this.tag>
    );
  }
});