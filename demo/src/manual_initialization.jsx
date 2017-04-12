var React = require('react');
var createReactClass = require('create-react-class');
var ReactDOM = require('react-dom');

// Note that Froala Editor has to be required separately
require("froala-editor/js/froala_editor.min.js");
require("froala-editor/css/froala_editor.min.css");

// Require Font Awesome.
require('font-awesome/css/font-awesome.css');

var FroalaEditor = require('react-froala-wysiwyg');
var FroalaEditorView = require('react-froala-wysiwyg/FroalaEditorView');

// Render Froala Editor component.
var EditorComponent = createReactClass({
  getInitialState: function() {
    return {
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

  handleController: function(initControls) {

    this.initControls = initControls;
    this.setState({initControls: initControls});
  },

  handleModelChange: function(model) {
    this.setState({content: model});
  },

  initializeEditor: function() {
    this.state.initControls.initialize();
    this.setState({initControls: this.state.initControls});
  },

  destroyEditor: function() {
    this.state.initControls.destroy();
    this.setState({initControls: this.state.initControls});
  },

  render: function() {
    return(
      <div className="sample">
        <h2>Manual Initialization</h2>
        {this.state.initControls ?
            <button className="manual" onClick={this.initializeEditor}>Initialize Editor</button>
            :
          null
        }
        {this.state.initControls && this.state.initControls.getEditor() ?
          <span>
            <button className="button" onClick={this.destroyEditor}>Close Editor</button>
            <button className="button" onClick={this.deleteAll}>Delete All</button>
          </span>
            :
          null
        }
        <FroalaEditor
          model={this.state.content}
          onModelChange={this.handleModelChange}
          onManualControllerReady={this.handleController}
        >
          Check out the <a href="https://www.froala.com/wysiwyg-editor">Froala Editor</a>
        </FroalaEditor>
      </div>
    );
  }
});

ReactDOM.render(<EditorComponent/>, document.getElementById('editor'));

require("file?name=[name].[ext]!./manual_initialization.html");