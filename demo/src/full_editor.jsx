var React = require('react');
var ReactDOM = require('react-dom');

// Note that Froala Editor has to be required separately
require("froala-editor/js/froala_editor.pkgd.min.js");
require("froala-editor/css/froala_editor.pkgd.min.css");

// Require Font Awesome.
require('font-awesome/css/font-awesome.css');

var FroalaEditor = require('react-froala-wysiwyg');
var FroalaEditorView = require('react-froala-wysiwyg/FroalaEditorView');

// Render Froala Editor component.
var EditorComponent = React.createClass({
  getInitialState: function() {
      return {content: '<span>My Document\'s Title</span>'};
    },
    handleModelChange: function(model) {
      this.setState({content: model});
    },
    render: function() {
      return(
        <div className="sample">
          <h2>Sample2: Full Editor</h2>
          <FroalaEditor
            model={this.state.content}
            onModelChange={this.handleModelChange}
          />
          <h4>Rendered Content:</h4>
          <FroalaEditorView
            model={this.state.content}
          />
        </div>
      );
    }
});

ReactDOM.render(<EditorComponent/>, document.getElementById('editor'));

require("file?name=[name].[ext]!./full_editor.html");