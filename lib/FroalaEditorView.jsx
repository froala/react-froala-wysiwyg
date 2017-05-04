var React = require('react');
var createReactClass = require('create-react-class');

var FroalaEditorView = createReactClass({

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

module.exports = FroalaEditorView;