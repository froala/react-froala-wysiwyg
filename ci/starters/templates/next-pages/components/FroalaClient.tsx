import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { useState } from 'react';

export default function FroalaClient() {
  const [model, setModel] = useState('<p>Hello from the starter check</p>');

  return (
    <>
      <FroalaEditorComponent
        tag="textarea"
        model={model}
        onModelChange={setModel}
        config={{ placeholderText: 'Start writing…' }}
      />
      <pre id="model-out">{model}</pre>
    </>
  );
}
