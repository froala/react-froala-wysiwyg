

var FroalaEditorFunctionality = {

  getTestString: function() {
    return 'Test'
  }
};

var FroalaEditor = React.createClass({
  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      <div>
        {this.getTestString()}
      </div>
    );
  }
});

var FroalaEditorImg = React.createClass({

  mixins: [FroalaEditorFunctionality],
  render: function() {
    return (
      <div>
        Test
      </div>
    );
  }
});