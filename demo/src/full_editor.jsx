// Note that Froala Editor has to be required separately
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.css';
import 'file-loader?name=[name].[ext]!./full_editor.html';
import 'froala-editor/js/plugins.pkgd.min.js';

import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import React from 'react';
import ReactDOM from 'react-dom';

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
    var toolbar = ['undo', 'redo' , 'bold', '|', 'wirisEditor', 'wirisChemistry', '|', 'insertImage','html'];
    let froalaConfiguration = {
      // Add the custom buttons in the toolbarButtons list, after the separator.
      iframe: true,
      charCounterCount: false,
      // Enable all the default plugins less linebreaker plugin and adding wiris plugin.
      pluginsEnabled: ["wiris", "align", "charCounter", "codeBeautifier", "codeView", "colors", "draggable", "embedly", "emoticons", "entities", "file", "fontAwesome", "fontFamily", "fontSize", "fullscreen", "image", "imageTUI", "imageManager", "inlineStyle", "inlineClass", "lineHeight", "link", "lists", "paragraphFormat", "paragraphStyle", "quickInsert", "quote", "save", "table", "url", "video", "wordPaste"],
      imageEditButtons: ['wirisEditor', 'wirisChemistry', 'imageRemove'],
      toolbarButtons: toolbar,
      toolbarButtonsMD: toolbar,
      toolbarButtonsSM: toolbar,
      toolbarButtonsXS: toolbar,
      htmlAllowedTags: ['.*'],
      htmlAllowedAttrs: ['.*'],
      htmlAllowedEmptyTags: ['mprescripts'],
      imageResize : false,
      key: 'CA5D-16E3A2E3G1I4A8B8A9B1D2rxycF-7b1C3vyz==',
      heightMax: 310,
      useClasses: false
    };


    return(
      <div className="sample">
        <h2>Full Featured</h2>
        <FroalaEditor
          model={this.state.content}
          onModelChange={this.handleModelChange}
          config={froalaConfiguration}

        />
        <h4>Rendered Content:</h4>
        <FroalaEditorView
          model={this.state.content}
        />
      </div>
    );
  }

}

ReactDOM.render(<EditorComponent/>, document.getElementById('editor'));