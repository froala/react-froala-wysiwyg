
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

  createEditor: function() {

    if (this.editorInitialized) {
      return;
    }
    this.editorInitialized = true;

    this.config = this.props.config || this.config;

    this.$element = $(this.refs.el);

    if (this.props.initModel) {

      if (this.hasSpecialTag) {
        this.setInitialSpecialTagModel();
      } else {
        this.setInitialModel();
      }
    }

    this.registerEvents();
    this.$editor = this.$element.froalaEditor(this.config).data('froala.editor').$el;
    this.initListeners();
  },

  setInitialModel: function() {

    var self = this;
    this.registerEvent(this.$element, 'froalaEditor.initialized', function () {

      self.$element.froalaEditor('html.set', self.props.initModel || '', true);
      //This will reset the undo stack everytime the model changes externally. Can we fix this?
      self.$element.froalaEditor('undo.reset');
      self.$element.froalaEditor('undo.saveStep');
    });
  },

  setInitialSpecialTagModel: function() {

    var self = this;

    var tags = this.props.initModel;

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

    var modelContent = null;

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


var FroalaEditor = React.createClass({displayName: "FroalaEditor",

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      React.createElement(this.tag, {ref: "el"}, this.props.children)
    );
  }
});

var FroalaEditorA = React.createClass({displayName: "FroalaEditorA",

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      React.createElement("a", {ref: "el"}, this.props.children)
    );
  }
});

var FroalaEditorButton = React.createClass({displayName: "FroalaEditorButton",

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      React.createElement("button", {ref: "el"}, this.props.children)
    );
  }
});

var FroalaEditorImg = React.createClass({displayName: "FroalaEditorImg",

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      React.createElement("img", {ref: "el"})
    );
  }
});

var FroalaEditorInput = React.createClass({displayName: "FroalaEditorInput",

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      React.createElement("input", {ref: "el"})
    );
  }
});

var FroalaView = React.createClass({displayName: "FroalaView",

  defaultTag: 'div',

  getTrustedHtml: function() {
    return {__html: this.props.model};
  },

  render: function() {
    this.tag = this.props.tag || this.defaultTag;
    return (
      React.createElement(this.tag, {className: "fr-view", dangerouslySetInnerHTML: this.getTrustedHtml()})
    );
  }
});


var Sample1 = React.createClass({displayName: "Sample1",

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
      React.createElement("div", {className: "sample"}, 
        React.createElement("h2", null, "Sample 1: Inline Edit"), 
        React.createElement(FroalaEditor, {
          tag: "textarea", 
          config: this.config, 
          initModel: this.state.myTitle, 
          onModelChange: this.handleModelChange}
        ), 
        React.createElement("input", {value: this.state.myTitle, onChange: this.handleInputChange})
      )
    );
  }
});

var Sample2 = React.createClass({displayName: "Sample2",

  getInitialState: function() {
    return {content: '<span>My Document\'s Title</span>'};
  },
  handleModelChange: function(model) {
    this.setState({content: model});
  },
  render: function() {
    return(
      React.createElement("div", {className: "sample"}, 
        React.createElement("h2", null, "Sample2: Full Editor"), 
        React.createElement(FroalaEditor, {
          initModel: this.state.content, 
          onModelChange: this.handleModelChange}
        ), 
        React.createElement("h4", null, "Rendered Content:"), 
        React.createElement(FroalaView, {
          model: this.state.content}
        )
      )
    );
  }
});

var Sample3 = React.createClass({displayName: "Sample3",

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
      React.createElement("div", {className: "sample"}, 
        React.createElement("h2", null, "Sample 3: Manual Initialization"), 
        this.state.initControls ?
            React.createElement("button", {className: "manual", onClick: this.initializeEditor}, "Initialize Editor")
            :
          null, 
        
        this.state.initControls && this.state.initControls.getEditor() ?
          React.createElement("span", null, 
            React.createElement("button", {className: "button", onClick: this.destroyEditor}, "Close Editor"), 
            React.createElement("button", {className: "button", onClick: this.deleteAll}, "Delete All")
          )
            :
          null, 
        
        React.createElement(FroalaEditor, {
          initModel: this.state.content, 
          onModelChange: this.handleModelChange, 
          onManualControllerReady: this.handleController
        }, 
          "Check out the ", React.createElement("a", {href: "https://www.froala.com/wysiwyg-editor"}, "Froala Editor")
        )
      )
    );
  }
});

var Sample4 = React.createClass({displayName: "Sample4",

  config: {
    reactIgnoreAttrs: ['class']
  },
  getInitialState: function() {
    return {content: {src: '../src/image.jpg'}};
  },
  handleModelChange: function(model) {
    this.setState({content: model});
  },

  render: function() {
    return(
      React.createElement("div", {className: "sample"}, 
        React.createElement("h2", null, "Sample 4: Editor on 'img' tag"), 
        React.createElement(FroalaEditorImg, {
          config: this.config, 
          initModel: this.state.content, 
          onModelChange: this.handleModelChange}
        ), 
        React.createElement("h4", null, "Model Obj:"), 
        React.createElement("div", null, JSON.stringify(this.state.content))
      )
    );
  }
});

var Sample5 = React.createClass({displayName: "Sample5",

  getInitialState: function() {
    return {content: {innerHTML: 'Click Me'}};
  },
  handleModelChange: function(model) {
    this.setState({content: model});
  },
  render: function() {
    return(
      React.createElement("div", {className: "sample"}, 
        React.createElement("h2", null, "Sample 5: Editor on 'button' tag"), 
        React.createElement(FroalaEditorButton, {
          initModel: this.state.content, 
          onModelChange: this.handleModelChange}
        ), 
        React.createElement("h4", null, "Model Obj:"), 
        React.createElement("div", null, JSON.stringify(this.state.content))
      )
    );
  }
});

var Sample6 = React.createClass({displayName: "Sample6",

  getInitialState: function() {
    return {content: {placeholder: 'I am an input!'}};
  },
  handleModelChange: function(model) {
    this.setState({content: model});
  },
  render: function() {
    return(
      React.createElement("div", {className: "sample"}, 
        React.createElement("h2", null, "Sample 6: Editor on 'input' tag"), 
        React.createElement(FroalaEditorInput, {
          initModel: this.state.content, 
          onModelChange: this.handleModelChange}
        ), 
        React.createElement("h4", null, "Model Obj:"), 
        React.createElement("div", null, JSON.stringify(this.state.content))
      )
    );
  }
});

var Sample7 = React.createClass({displayName: "Sample7",

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
      React.createElement("div", {className: "sample"}, 
        React.createElement("h2", null, "Sample 7: Editor on 'a' tag. Manual Initialization"), 
        this.state.initControls ?
            React.createElement("button", {className: "manual", onClick: this.initializeEditor}, "Initialize Editor")
            :
          null, 
        
        this.state.initControls && this.state.initControls.getEditor() ?
          React.createElement("span", null, 
            React.createElement("button", {className: "button", onClick: this.destroyEditor}, "Close Editor"), 
            React.createElement("button", {className: "button", onClick: this.deleteAll}, "Delete All")
          )
            :
          null, 
        
        React.createElement("div", null, 
          React.createElement(FroalaEditorA, {
            initModel: this.state.content, 
            onModelChange: this.handleModelChange, 
            onManualControllerReady: this.handleController
          }, 
            "Froala Editor"
          )
        )
      )
    );
  }
});


var Demo = React.createClass({displayName: "Demo",

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, "React adapter for the Froala WYSIWYG editor"), 
        React.createElement(Sample1, null), 
        React.createElement(Sample2, null), 
        React.createElement(Sample3, null), 
        React.createElement(Sample4, null), 
        React.createElement(Sample5, null), 
        React.createElement(Sample6, null), 
        React.createElement(Sample7, null)
      )
    );
  }
});

ReactDOM.render(
  React.createElement(Demo, null),
  document.getElementById('content')
);
//# sourceMappingURL=app.js.map
