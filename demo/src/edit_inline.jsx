var React = require('react');
var ReactDOM = require('react-dom');

// Note that Froala Editor has to be required separately
require("froala-editor/js/froala_editor.min.js");
require("froala-editor/css/froala_editor.min.css");

// Require Font Awesome.
require('font-awesome/css/font-awesome.css');

var FroalaEditor = require('react-froala-wysiwyg');

// Render Froala Editor component.
var EditorComponent = React.createClass({
  config: {
    placeholderText: 'Add a Title',
    charCounterCount: false,
    toolbarInline: true,
    events: {
      'froalaEditor.initialized': function() {
        console.log('initialized');
      }
    }
  },

  getInitialState: function() {
    return {myTitle: ''};
  },

  handleModelChange: function(model) {
    this.setState({myTitle: model});
  },

  handleInputChange: function(e) {
    this.setState({myTitle: e.target.value});
  },

  render: function() {
    return(
      <div className="sample">
        <h2>Sample 1: Inline Edit</h2>
        <FroalaEditor
          tag='textarea'
          config={this.config}
          model={this.state.myTitle}
          onModelChange={this.handleModelChange}
        />
        <input value={this.state.myTitle} onChange={this.handleInputChange}/>
      </div>
    );
  }
});

ReactDOM.render(<EditorComponent/>, document.getElementById('editor'));

require("file?name=[name].[ext]!./edit_inline.html");