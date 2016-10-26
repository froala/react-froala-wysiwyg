var FroalaEditorFunctionality = {

  // Tag on which the editor is initialized.
  tag: null,
  defaultTag: 'div',
  listeningEvents: [],

  // Jquery wrapped element.
  $element: null,

  // Editor element.
  $editor: null,

  // Editor options config
  config: {
    immediateReactModelUpdate: false,
    reactIgnoreAttrs: null
  },

  editorInitialized: false,

  SPECIAL_TAGS: ['img', 'button', 'input', 'a'],
  INNER_HTML_ATTR: 'innerHTML',
  hasSpecialTag: false,

  oldModel: null,

  // Before first time render.
  componentWillMount: function() {
    this.tag = this.props.tag || this.defaultTag;
  },

  // After first time render.
  componentDidMount: function() {

    var tagName = this.refs.el.tagName.toLowerCase();
    if (this.SPECIAL_TAGS.indexOf(tagName) != -1) {

      this.tag = tagName;
      this.hasSpecialTag = true;
    }

    if (this.props.onManualControllerReady) {
      this.generateManualController();
    } else {
      this.createEditor();
    }
  },

  componentWillUnmount: function() {
    this.destroyEditor();
  },

  componentDidUpdate: function() {

    if (JSON.stringify(this.oldModel) == JSON.stringify(this.props.model)) {
      return;
    }

    this.setContent();
  },

  createEditor: function() {

    if (this.editorInitialized) {
      return;
    }

    this.config = this.props.config || this.config;

    this.$element = $(this.refs.el);

    this.setContent(true);

    this.registerEvents();
    this.$editor = this.$element.froalaEditor(this.config).data('froala.editor').$el;
    this.initListeners();

    this.editorInitialized = true;
  },

  setContent: function(firstTime) {

    if (!this.editorInitialized && !firstTime) {
      return;
    }

    if (this.props.model || this.props.model == '') {

      this.oldModel = this.props.model;

      if (this.hasSpecialTag) {
        this.setSpecialTagContent();
      } else {
        this.setNormalTagContent(firstTime);
      }
    }
  },

  setNormalTagContent: function(firstTime) {

    var self = this;

    function htmlSet() {

      self.$element.froalaEditor('html.set', self.props.model || '', true);
      //This will reset the undo stack everytime the model changes externally. Can we fix this?
      self.$element.froalaEditor('undo.reset');
      self.$element.froalaEditor('undo.saveStep');
    }

    if (firstTime) {
      this.registerEvent(this.$element, 'froalaEditor.initialized', function () {
        htmlSet();
      });
    } else {
      htmlSet();
    }

  },

  setSpecialTagContent: function() {

    var tags = this.props.model;

    // add tags on element
    if (tags) {

      for (var attr in tags) {
        if (tags.hasOwnProperty(attr) && attr != this.INNER_HTML_ATTR) {
          this.$element.attr(attr, tags[attr]);
        }
      }

      if (tags.hasOwnProperty(this.INNER_HTML_ATTR)) {
        this.$element[0].innerHTML = tags[this.INNER_HTML_ATTR];
      }
    }
  },

  destroyEditor: function() {

    if (this.$element) {

      this.listeningEvents && this.$element.off(this.listeningEvents.join(" "));
      this.$editor.off('keyup');
      this.$element.froalaEditor('destroy');
      this.listeningEvents.length = 0;
      this.$element = null;
      this.editorInitialized = false;
    }
  },

  getEditor: function() {

    if (this.$element) {
      return this.$element.froalaEditor.bind(this.$element);
    }
    return null;
  },

  generateManualController: function() {

    var self = this;
    var controls = {
      initialize: this.createEditor,
      destroy: this.destroyEditor,
      getEditor: this.getEditor,
    };

    this.props.onManualControllerReady(controls);
  },

  updateModel: function() {

    if (!this.props.onModelChange) {
      return;
    }

    var modelContent = '';

    if (this.hasSpecialTag) {

      var attributeNodes = this.$element[0].attributes;
      var attrs = {};

      for (var i = 0; i < attributeNodes.length; i++ ) {

        var attrName = attributeNodes[i].name;
        if (this.config.reactIgnoreAttrs && this.config.reactIgnoreAttrs.indexOf(attrName) != -1) {
          continue;
        }
        attrs[attrName] = attributeNodes[i].value;
      }

      if (this.$element[0].innerHTML) {
        attrs[this.INNER_HTML_ATTR] = this.$element[0].innerHTML;
      }

      modelContent = attrs;
    } else {

      var returnedHtml = this.$element.froalaEditor('html.get');
      if (typeof returnedHtml === 'string') {
        modelContent = returnedHtml;
      }
    }

    this.oldModel = modelContent;
    this.props.onModelChange(modelContent);
  },

  initListeners: function() {
    var self = this;

    // bind contentChange and keyup event to froalaModel
    this.registerEvent(this.$element, 'froalaEditor.contentChanged',function () {
      self.updateModel();
    });
    if (this.config.immediateReactModelUpdate) {
      this.registerEvent(this.$editor, 'keyup', function () {
        self.updateModel();
      });
    }
  },

  // register event on jquery editor element
  registerEvent: function(element, eventName, callback) {

    if (!element || !eventName || !callback) {
      return;
    }

    this.listeningEvents.push(eventName);
    element.on(eventName, callback);
  },

  registerEvents: function() {

    var events = this.config.events;
    if (!events) {
      return;
    }

    for (var event in events) {
      if (events.hasOwnProperty(event)) {
        this.registerEvent(this.$element, event, events[event]);
      }
    }

  }
};

export default FroalaEditorFunctionality;

import React from 'react';
import FroalaEditorFunctionality from './froalaEditorFunctionality.js';

var FroalaEditor = React.createClass({
  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      <this.tag ref='el'>{this.props.children}</this.tag>
    );
  }
});

export default FroalaEditor;
import React from 'react';
import FroalaEditorFunctionality from './froalaEditorFunctionality.js';

var FroalaEditorA = React.createClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      <a ref='el'>{this.props.children}</a>
    );
  }
});

export default FroalaEditorA;
import React from 'react';
import FroalaEditorFunctionality from './froalaEditorFunctionality.js';

var FroalaEditorButton = React.createClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      <button ref='el'>{this.props.children}</button>
    );
  }
});

export default FroalaEditorButton;
import React from 'react';
import FroalaEditorFunctionality from './froalaEditorFunctionality.js';

var FroalaEditorImg = React.createClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      <img ref='el'/>
    );
  }
});

export default FroalaEditorImg;
import React from 'react';
import FroalaEditorFunctionality from './froalaEditorFunctionality.js';

var FroalaEditorInput = React.createClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      <input ref='el'/>
    );
  }
});

export default FroalaEditorInput;
import React from 'react';

var FroalaView = React.createClass({

  defaultTag: 'div',

  getTrustedHtml: function() {
    return {__html: this.props.model};
  },

  render: function() {
    this.tag = this.props.tag || this.defaultTag;
    return (
      <this.tag className='fr-view' dangerouslySetInnerHTML={this.getTrustedHtml()}></this.tag>
    );
  }
});

export default FroalaEditorView;


var Sample1 = React.createClass({

  config: {
    placeholderText: 'Add a Title',
    charCounterCount: false,
    toolbarInline: true,
    events: {
      'froalaEditor.initialized': function() {
        console.log('initialized');
      }
    }
  },

  getInitialState: function() {
    return {myTitle: ''};
  },

  handleModelChange: function(model) {
    this.setState({myTitle: model});
  },

  handleInputChange: function(e) {
    this.setState({myTitle: e.target.value});
  },

  render: function() {
    return(
      <div className="sample">
        <h2>Sample 1: Inline Edit</h2>
        <FroalaEditor
          tag='textarea'
          config={this.config}
          model={this.state.myTitle}
          onModelChange={this.handleModelChange}
        />
        <input value={this.state.myTitle} onChange={this.handleInputChange}/>
      </div>
    );
  }
});

var Sample2 = React.createClass({

  getInitialState: function() {
    return {content: '<span>My Document\'s Title</span>'};
  },
  handleModelChange: function(model) {
    this.setState({content: model});
  },
  render: function() {
    return(
      <div className="sample">
        <h2>Sample2: Full Editor</h2>
        <FroalaEditor
          model={this.state.content}
          onModelChange={this.handleModelChange}
        />
        <h4>Rendered Content:</h4>
        <FroalaView
          model={this.state.content}
        />
      </div>
    );
  }
});

var Sample3 = React.createClass({

  getInitialState: function() {
    return {content: '<span>My Document\'s Title</span>'};
  },
  handleModelChange: function(model) {
    this.setState({content: model});
  },
  render: function() {
    return(
      <div className="sample">
        <h2>Sample3: Two way binding</h2>
        <FroalaEditor
          model={this.state.content}
          onModelChange={this.handleModelChange}
        />
        <FroalaEditor
          model={this.state.content}
          onModelChange={this.handleModelChange}
        />
      </div>
    );
  }
});

var Sample4 = React.createClass({

  getInitialState: function() {
    return {
      initControls: null
    };
  },

  deleteAll: function() {
    if (!this.state.initControls) {
      return;
    }
    this.state.initControls.getEditor()('html.set', '');
    this.state.initControls.getEditor()('undo.reset');
    this.state.initControls.getEditor()('undo.saveStep');
  },

  handleController: function(initControls) {

    this.initControls = initControls;
    this.setState({initControls: initControls});
  },

  handleModelChange: function(model) {
    this.setState({content: model});
  },

  initializeEditor: function() {
    this.state.initControls.initialize();
    this.setState({initControls: this.state.initControls});
  },

  destroyEditor: function() {
    this.state.initControls.destroy();
    this.setState({initControls: this.state.initControls});
  },

  render: function() {
    return(
      <div className="sample">
        <h2>Sample 4: Manual Initialization</h2>
        {this.state.initControls ?
            <button className="manual" onClick={this.initializeEditor}>Initialize Editor</button>
            :
          null
        }
        {this.state.initControls && this.state.initControls.getEditor() ?
          <span>
            <button className="button" onClick={this.destroyEditor}>Close Editor</button>
            <button className="button" onClick={this.deleteAll}>Delete All</button>
          </span>
            :
          null
        }
        <FroalaEditor
          model={this.state.content}
          onModelChange={this.handleModelChange}
          onManualControllerReady={this.handleController}
        >
          Check out the <a href="https://www.froala.com/wysiwyg-editor">Froala Editor</a>
        </FroalaEditor>
      </div>
    );
  }
});

var Sample5 = React.createClass({

  config: {
    reactIgnoreAttrs: ['tmpattr']
  },
  getInitialState: function() {
    return {content: {src: '../src/image.jpg', id: 'froalaEditor', tmpattr: 'This attribute will be ignored on change.'}};
  },
  handleModelChange: function(model) {
    this.setState({content: model});
  },

  render: function() {
    return(
      <div className="sample">
        <h2>Sample 5: Editor on 'img' tag. Two way binding.</h2>
        <FroalaEditorImg
          config={this.config}
          model={this.state.content}
          onModelChange={this.handleModelChange}
        />
        <FroalaEditorImg
          config={this.config}
          model={this.state.content}
          onModelChange={this.handleModelChange}
        />
        <h4>Model Obj:</h4>
        <div>{JSON.stringify(this.state.content)}</div>
      </div>
    );
  }
});

var Sample6 = React.createClass({

  getInitialState: function() {
    return {content: {innerHTML: 'Click Me'}};
  },
  handleModelChange: function(model) {
    this.setState({content: model});
  },
  render: function() {
    return(
      <div className="sample">
        <h2>Sample 6: Editor on 'button' tag</h2>
        <FroalaEditorButton
          model={this.state.content}
          onModelChange={this.handleModelChange}
        />
        <h4>Model Obj:</h4>
        <div>{JSON.stringify(this.state.content)}</div>
      </div>
    );
  }
});

var Sample7 = React.createClass({

  getInitialState: function() {
    return {content: {placeholder: 'I am an input!'}};
  },
  handleModelChange: function(model) {
    this.setState({content: model});
  },
  render: function() {
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
});

var Sample8 = React.createClass({

  getInitialState: function() {
    return {
      content: {
        href: 'https://www.froala.com/wysiwyg-editor'
      },
      initControls: null
    };
  },

  deleteAll: function() {
    if (!this.state.initControls) {
      return;
    }
    this.state.initControls.getEditor()('html.set', '');
    this.state.initControls.getEditor()('undo.reset');
    this.state.initControls.getEditor()('undo.saveStep');
  },

  handleController: function(initControls) {

    this.initControls = initControls;
    this.setState({initControls: initControls});
  },

  handleModelChange: function(model) {
    this.setState({content: model});
  },

  initializeEditor: function() {
    this.state.initControls.initialize();
    this.setState({initControls: this.state.initControls});
  },

  destroyEditor: function() {
    this.state.initControls.destroy();
    this.setState({initControls: this.state.initControls});
  },
  render: function() {
    return(
      <div className="sample">
        <h2>Sample 8: Editor on 'a' tag. Manual Initialization</h2>
        {this.state.initControls ?
            <button className="manual" onClick={this.initializeEditor}>Initialize Editor</button>
            :
          null
        }
        {this.state.initControls && this.state.initControls.getEditor() ?
          <span>
            <button className="button" onClick={this.destroyEditor}>Close Editor</button>
            <button className="button" onClick={this.deleteAll}>Delete All</button>
          </span>
            :
          null
        }
        <div>
          <FroalaEditorA
            model={this.state.content}
            onModelChange={this.handleModelChange}
            onManualControllerReady={this.handleController}
          >
            Froala Editor
          </FroalaEditorA>
        </div>
      </div>
    );
  }
});


var Demo = React.createClass({

  render: function() {
    return (
      <div>
        <h1>React adapter for the Froala WYSIWYG editor</h1>
        <Sample1/>
        <Sample2/>
        <Sample3/>
        <Sample4/>
        <Sample5/>
        <Sample6/>
        <Sample7/>
        <Sample8/>
      </div>
    );
  }
});

ReactDOM.render(
  <Demo/>,
  document.getElementById('content')
);
//# sourceMappingURL=app.js.map
