// Note that Froala Editor has to be required separately.

import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.css';
import 'file-loader?name=[name].[ext]!./basic.html';

import FroalaEditor from 'react-froala-wysiwyg';
import React from 'react';
import ReactDOM from 'react-dom/client';

// Render Froala Editor component.
const root = ReactDOM.createRoot(document.getElementById('editor'));
root.render(<FroalaEditor tag='textarea' config={{
  pluginsEnabled: ['align', 'link'],
  key: 'YNB3fH3C10C7B7B5D2G2C-8evjgkiB5cejJ-7oA8sD-13F-11oF4I4B3C11A3B5E4B2A3B3==',
  language: 'ro',
  events: {
    initialized: function (e) {
      var editor = this;
      console.log('@@@@@@initialized', editor, e);
    }
  }
}} />);

