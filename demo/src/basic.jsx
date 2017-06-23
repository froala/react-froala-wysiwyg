import React from 'react';
import ReactDOM from 'react-dom';

// Note that Froala Editor has to be required separately.
import 'froala-editor/js/froala_editor.min.js';
import 'froala-editor/css/froala_editor.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

// Render Froala Editor component.
ReactDOM.render(<FroalaEditor tag='textarea'/>, document.getElementById('editor'));

import 'file?name=[name].[ext]!./basic.html';