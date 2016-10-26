var React = require('react');
var ReactDOM = require('react-dom');

// Note that Froala Editor has to be required separately.
require("froala-editor/js/froala_editor.min.js");
require("froala-editor/css/froala_editor.min.css");

// Require Font Awesome.
require('font-awesome/css/font-awesome.css');

var FroalaEditor = require('react-froala-wysiwyg');

// Render Froala Editor component.
ReactDOM.render(<FroalaEditor tag='textarea'/>, document.getElementById('editor'));

require("file?name=[name].[ext]!./basic.html");