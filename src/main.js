

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
      <div className="sample">
        <h2>Sample 5: Editor on 'img' tag</h2>
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