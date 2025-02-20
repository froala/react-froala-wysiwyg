// Note that Froala Editor has to be required separately
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.css';
import 'file-loader?name=[name].[ext]!./init_on_button.html';
import 'froala-editor/js/plugins.pkgd.min.js';
import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
import React from 'react';
import ReactDOM from 'react-dom/client';

// Render Froala Editor component.
class EditorComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      content: {
        innerHTML: 'Click Me'
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
}

const root = ReactDOM.createRoot(document.getElementById('editor'));
root.render(<EditorComponent/>);

