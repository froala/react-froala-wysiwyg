

var Demo = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Angular adapter for the Froala WYSIWYG editor</h1>
        <div className="sample">
          <h2>Sample 1: Inline Edit</h2>
          <FroalaEditor />
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <Demo/>,
  document.getElementById('content')
);