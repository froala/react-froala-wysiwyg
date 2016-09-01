
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
