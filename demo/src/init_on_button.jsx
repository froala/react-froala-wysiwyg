var React = require('react');
var createReactClass = require('create-react-class');
var ReactDOM = require('react-dom');

// Note that Froala Editor has to be required separately
require("froala-editor/js/froala_editor.min.js");
require("froala-editor/css/froala_editor.min.css");

// Require Font Awesome.
require('font-awesome/css/font-awesome.css');

var FroalaEditor = require('react-froala-wysiwyg');
var FroalaEditorButton = require('react-froala-wysiwyg/FroalaEditorButton');

// Render Froala Editor component.
var EditorComponent = createReactClass({
  getInitialState: function() {
    return {content: {innerHTML: 'Click Me'}};
  },
  handleModelChange: function(model) {
    this.setState({content: model});
  },
  render: function() {
    return(
      <div className="sample">
        <h2>Editor on 'button' tag</h2>
        <FroalaEditorButton
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

require("file?name=[name].[ext]!./init_on_button.html");