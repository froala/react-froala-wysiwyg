import { useState } from 'react';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import FroalaEditorComponent from 'react-froala-wysiwyg';

export default function App() {
  const [model, setModel] = useState('<p>Hello from the starter check</p>');

  return (
    <main>
      <FroalaEditorComponent
        tag="textarea"
        model={model}
        onModelChange={setModel}
        config={{ placeholderText: 'Start writing…' }}
      />
      <pre id="model-out">{model}</pre>
    </main>
  );
}
