// Note that Froala Editor has to be required separately
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/css/froala_style.css';
import 'file-loader?name=[name].[ext]!./init_on_input.html';


import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';
import React from 'react';
import ReactDOM from 'react-dom/client';

// Render Froala Editor component.
class EditorComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      content: {
        placeholder: 'I am an input!'
      }
    };

    this.handleModelChange = this.handleModelChange.bind(this);
  }

  handleModelChange (model) {
    this.setState({
      content: model
    });
  }

  render () {
    return(
      <div className="sample">
        <h2>Sample 7: Editor on 'input' tag</h2>
        <FroalaEditorInput
          model={this.state.content}
          onModelChange={this.handleModelChange}
        />
        <h4>Model Obj:</h4>
        <div>{JSON.stringify(this.state.content)}</div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('editor'));
root.render(<EditorComponent/>);

