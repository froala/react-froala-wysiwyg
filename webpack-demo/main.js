// Import Froala Editor library.
require("froala-wysiwyg-editor/js/froala_editor.min.js");
require("froala-wysiwyg-editor/css/froala_editor.min.css");

// Import Froala Editor React component.
import FroalaEditor from '../lib/FroalaEditor.js';

// Import react.
import React from 'react';
import ReactDOM from 'react-dom';

// Render Froala Editor component.
ReactDOM.render(<FroalaEditor tag='textarea'/>, document.getElementById('editor'));