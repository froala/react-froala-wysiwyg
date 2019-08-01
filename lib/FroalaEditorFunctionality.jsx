import FroalaEditor from 'froala-editor';
import React from 'react';

let lastId = 0;
export default class FroalaEditorFunctionality extends React.Component {
  constructor(props) {
    super(props);

    // Tag on which the editor is initialized.
    this.tag = null;
    this.defaultTag = 'div';
    this.listeningEvents = [];

    // Jquery wrapped element.
    this.element = null;

    // Editor element.
    this.editor = null;

    // Editor options config
    this.config = {
      immediateReactModelUpdate: false,
      reactIgnoreAttrs: null
    };

    this.editorInitialized = false;

    this.SPECIAL_TAGS = ['img', 'button', 'input', 'a'];
    this.INNER_HTML_ATTR = 'innerHTML';
    this.hasSpecialTag = false;

    this.oldModel = null;
  }

  // Before first time render.
  componentWillMount() {
    this.tag = this.props.tag || this.defaultTag;
  }

  // After first time render.
  componentDidMount() {
    let tagName = this.el.tagName.toLowerCase();
    if (this.SPECIAL_TAGS.indexOf(tagName) != -1) {
      this.tag = tagName;
      this.hasSpecialTag = true;
    }

    if (this.props.onManualControllerReady) {
      this.generateManualController();
    } else {
      this.createEditor();
    }
  }

  componentWillUnmount() {
    this.destroyEditor();
  }

  componentDidUpdate() {
    if (JSON.stringify(this.oldModel) == JSON.stringify(this.props.model)) {
      return;
    }

    this.setContent();
  }

  createEditor() {
    if (this.editorInitialized) {
      return;
    }

    this.config = this.props.config || this.config;

    this.element = this.el;

    if (this.props.model) {
      this.element.innerHTML = this.props.model;
    }

    this.setContent(true);

    // Default initialized.
    this.registerEvent('initialized', this.config.events && this.config.events.initialized);

    // Check if events are set.
    if (!this.config.events) this.config.events = {};
    this.config.events.initialized = () => this.initListeners();

    this.editor = new FroalaEditor(this.element, this.config);
    // Call init events.
    if (this._initEvents) {
      for (let i = 0; i < this._initEvents.length; i++) {
        this._initEvents[i].call(this.editor);
      }
    }
  }

  setContent(firstTime) {
    if (this.props.model || this.props.model == '') {
      this.oldModel = this.props.model;

      if (this.hasSpecialTag) {
        this.setSpecialTagContent();
      } else {
        this.setNormalTagContent(firstTime);
      }
    }
  }

  setNormalTagContent(firstTime) {
    let self = this;

    function htmlSet() {
      self.editor.html && self.editor.html.set(self.props.model || '');
      if (self.editorInitialized && self.editor.undo) {
        //This will reset the undo stack everytime the model changes externally. Can we fix this?
        self.editor.undo.reset();
        self.editor.undo.saveStep();
      }
    }

    if (firstTime) {
      if (this.config.initOnClick) {
        this.registerEvent('initializationDelayed', () => {
          htmlSet();
        });

        this.registerEvent('initialized', () => {
          this.editorInitialized = true;
        });
      } else {
        this.registerEvent('initialized', () => {
          this.editorInitialized = true;
          htmlSet();
        });
      }
    } else {
      htmlSet();
    }
  }

  setSpecialTagContent() {
    let tags = this.props.model;

    // add tags on element
    if (tags) {
      for (let attr in tags) {
        if (tags.hasOwnProperty(attr) && attr != this.INNER_HTML_ATTR) {
          this.element.setAttribute(attr, tags[attr]);
        }
      }

      if (tags.hasOwnProperty(this.INNER_HTML_ATTR)) {
        this.element.innerHTML = tags[this.INNER_HTML_ATTR];
      }
    }
  }

  destroyEditor() {
    if (this.element) {
      this.editor.destroy && this.editor.destroy();
      this.listeningEvents.length = 0;
      this.element = null;
      this.editorInitialized = false;
    }
  }

  getEditor() {
    if (this.element) {
      return this.editor;
    }

    return null;
  }

  generateManualController() {
    let self = this;

    let controls = {
      initialize: () => self.createEditor.call(self),
      destroy: () => self.destroyEditor.call(self),
      getEditor: () => self.getEditor.call(self)
    };

    this.props.onManualControllerReady(controls);
  }

  updateModel() {
    if (!this.props.onModelChange) {
      return;
    }

    let modelContent = '';

    if (this.hasSpecialTag) {
      let attributeNodes = this.element.attributes;
      let attrs = {};

      for (let i = 0; i < attributeNodes.length; i++) {
        let attrName = attributeNodes[i].name;
        if (this.config.reactIgnoreAttrs && this.config.reactIgnoreAttrs.indexOf(attrName) != -1) {
          continue;
        }
        attrs[attrName] = attributeNodes[i].value;
      }

      if (this.element.innerHTML) {
        attrs[this.INNER_HTML_ATTR] = this.element.innerHTML;
      }

      modelContent = attrs;
    } else {
      let returnedHtml = this.editor.html.get();
      if (typeof returnedHtml === 'string') {
        modelContent = returnedHtml;
      }
    }

    this.oldModel = modelContent;
    this.props.onModelChange(modelContent);
  }

  initListeners() {
    let self = this;

    // bind contentChange and keyup event to froalaModel
    this.editor.events.on('contentChanged', function () {
      self.updateModel();
    });
    if (this.config.immediateReactModelUpdate) {
      this.editor.events.on('keyup', function () {
        self.updateModel();
      });
    }
  }

  // register event on jquery editor element
  registerEvent(eventName, callback) {
    if (!eventName || !callback) {
      return;
    }

    if (eventName == 'initialized') {
      if (!this._initEvents) this._initEvents = [];
      this._initEvents.push(callback);
    }
    else {
      if (!this.config.events) {
        this.config.events = {};
      }

      this.config.events[eventName] = callback;
    }
  }
};
