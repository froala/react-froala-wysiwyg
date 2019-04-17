// Note that Froala Editor has to be required separately.

import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.css';
import 'font-awesome/css/font-awesome.css';
import 'file-loader?name=[name].[ext]!./basic.html';

import FroalaEditor from 'react-froala-wysiwyg';
import React from 'react';
import ReactDOM from 'react-dom';
// Require Font Awesome.

// Render Froala Editor component.
ReactDOM.render(<FroalaEditor tag='textarea' config={{pluginsEnabled:['image', 'link']}}/>, document.getElementById('editor'));

