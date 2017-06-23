var React = require('react');
var createReactClass = require('create-react-class');
var ReactDOM = require('react-dom');

// Note that Froala Editor has to be required separately
require("froala-editor/js/froala_editor.pkgd.min.js");
require("froala-editor/css/froala_editor.pkgd.min.css");

// Require Font Awesome.
require('font-awesome/css/font-awesome.css');

var FroalaEditor = require('react-froala-wysiwyg');
var FroalaEditorA = require('react-froala-wysiwyg/FroalaEditorA');

// Render Froala Editor component.
var EditorComponent = createReactClass({
  getInitialState: function() {
    return {
      content: {
        href: 'https://www.froala.com/wysiwyg-editor'
      },
      initControls: null
    };
  },

  deleteAll: function() {
    if (!this.state.initControls) {
      return;
    }
    this.state.initControls.getEditor()('html.set', '');
    this.state.initControls.getEditor()('undo.reset');
    this.state.initControls.getEditor()('undo.saveStep');
  },
  render: function() {
    return(
      <div className="sample">
        <h2>Editor on 'a' tag.</h2>
        <div>
          <FroalaEditorA
            model={this.state.content}
            onModelChange={this.handleModelChange}
          >
            Froala Editor
          </FroalaEditorA>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<EditorComponent/>, document.getElementById('editor'));

require("file?name=[name].[ext]!./init_on_link.html");