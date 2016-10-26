var React = require('react');
var ReactDOM = require('react-dom');

// Note that Froala Editor has to be required separately
require("froala-editor/js/froala_editor.pkgd.min.js");
require("froala-editor/css/froala_editor.pkgd.min.css");

// Require Font Awesome.
require('font-awesome/css/font-awesome.css');

var FroalaEditor = require('react-froala-wysiwyg');
var FroalaEditorImg = require('react-froala-wysiwyg/FroalaEditorImg');

// Render Froala Editor component.
var EditorComponent = React.createClass({
  config: {
    reactIgnoreAttrs: ['tmpattr']
  },
  getInitialState: function() {
    return {content: {src: '../image.jpg', id: 'froalaEditor', tmpattr: 'This attribute will be ignored on change.'}};
  },
  handleModelChange: function(model) {
    this.setState({content: model});
  },

  render: function() {
    return(
      <div className="sample">
        <h2>Editor on 'img' tag. Two way binding.</h2>
        <FroalaEditorImg
          config={this.config}
          model={this.state.content}
          onModelChange={this.handleModelChange}
        />
        <FroalaEditorImg
          config={this.config}
          model={this.state.content}
          onModelChange={this.handleModelChange}
        />
        <h4>Model Obj:</h4>
        <div>{JSON.stringify(this.state.content)}</div>
      </div>
    );
  }
});

ReactDOM.render(<EditorComponent/>, document.getElementById('editor'));

require("file?name=[name].[ext]!./init_on_image.html");