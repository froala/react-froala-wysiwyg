

var Demo = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Angular adapter for the Froala WYSIWYG editor</h1>
        <div className="sample">
          <h2>Sample 1: Inline Edit</h2>
          <FroalaEditor
            tag='textarea'
            config={{
              placeholderText: 'Add a Title',
              charCounterCount: false,
              toolbarInline: true,
              events: {
                'froalaEditor.initialized': function() {
                  console.log('initialized');
                }
              }
            }}
          />
        </div>

        <div className="sample">
          <h2>Sample2: Full Editor</h2>
          <FroalaEditor/>
          <h4>Rendered Content:</h4>
          <div></div>
        </div>

        <div className="sample">
          <h2>Sample 3: Manual Initialization</h2>

        </div>

        <div className="sample">
          <h2>Sample 4: Editor on 'img' tag</h2>

        </div>

        <div className="sample">
          <h2>Sample 5: Editor on 'button' tag</h2>

        </div>

        <div className="sample">
          <h2>Sample 6: Editor on 'input' tag</h2>

        </div>

        <div className="sample">
          <h2>Sample 7: Editor on 'a' tag. Manual Initialization</h2>

        </div>

      </div>
    );
  }
});

ReactDOM.render(
  <Demo/>,
  document.getElementById('content')
);