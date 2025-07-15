// Note that Froala Editor has to be required separately
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.css';
import 'file-loader?name=[name].[ext]!./full_editor.html';

import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import React from 'react';
import ReactDOM from 'react-dom/client';

import 'froala-editor/js/plugins.pkgd.min.js';
// Render Froala Editor component.
class EditorComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      content: '<span>My Document\'s Title</span>'
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
        <h2>Unlicensed Froala</h2>
        <FroalaEditor />
        <h2>Licensed Froala</h2>
        <FroalaEditor config={{key: "UBB7jD5D5B3F4A2B10C10bHIMFI1EWBXIJe1BZLZFd1d1MXQLjC10D7D5A3B2A3E4E2C2C4==", fontSizeDefaultSelection: 18, fontFamilyDefaultSelection: 'Tahoma'}} />
        <h2>Full Featured</h2>
        <FroalaEditor
          config={{key: "YNB3fH3C10C7B7B5D2G2C-8evjgkiB5cejJ-7oA8sD-13F-11oF4I4B3C11A3B5E4B2A3B3==", fontSizeDefaultSelection: 18, fontFamilyDefaultSelection: 'Tahoma'}}
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

}

const root = ReactDOM.createRoot(document.getElementById('editor'));
root.render(<EditorComponent/>);

