# React JS Froala WYSIWYG Editor

>react-froala-wyswiyg provides React bindings to the Froala WYSIWYG editor VERSION 2.

## Installation

```bash
npm install react-froala-wysiwyg --save
```

## Usage

#### 1. Install the React component.

```bash
npm install react-froala-wysiwyg react --save
```

#### 2. Require and use Froala Editor component inside your application.

```jsx
var React = require('react');
var ReactDOM = require('react-dom');

// Require Editor JS files.
require("froala-editor/js/froala_editor.pkgd.min.js");
require("froala-editor/css/froala_editor.pkgd.min.css");

// Require Font Awesome.
require('font-awesome/css/font-awesome.css');

var FroalaEditor = require('react-froala-wysiwyg');

// Include special components if required.
// var FroalaEditorView = require('react-froala-wysiwyg/FroalaEditorView');
// var FroalaEditorA = require('react-froala-wysiwyg/FroalaEditorA');
// var FroalaEditorButton= require('react-froala-wysiwyg/FroalaEditorButton');
// var FroalaEditorImg = require('react-froala-wysiwyg/FroalaEditorImg');
// var FroalaEditorInput = require('react-froala-wysiwyg/FroalaEditorInput');

// Render Froala Editor component.
ReactDOM.render(<FroalaEditor tag='textarea'/>, document.getElementById('editor'));
```

#### 3. Make sure you have the right Webpack settings for loading the CSS files, Font Awesome and jQuery.

```js
var webpack = require("webpack");

module.exports = {
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['react','es2015', 'stage-2']
        }
      }, {
        test: /\.css$/,
        loader: "style-loader!css-loader?root=."
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
```

#### Pass properties to the wrapping DOM element

```js
<FroalaEditor
  tag='textarea'
  config={this.config}
  model={this.state.model}
  onModelChange={this.handleModelChange}
/>
```

**tag** attr is used to tell on which tag the editor is initialized.

There are special tags: **a**, **button**, **img**, **input**. Do not use them in FroalaEditor component. To initialize the editor on a special tag, use `FroalaEditorA`, `FroalaEditorButton`, `FroalaEditorImg` and `FroalaEditorInput` components.


### Options

You can pass editor options as component attribute (optional).

`config={this.config}`

You can pass any existing Froala option. Consult the [Froala documentation](https://www.froala.com/wysiwyg-editor/docs/options) to view the list of all the available options:

```js
config: {
  placeholderText: 'Edit Your Content Here!',
  charCounterCount: false
}
```

Aditional option is used:
 * **immediateReactModelUpdate**: (default: false) This option updates the React model as soon as a key is released in the editor. Note that it may affect performances.

### Events and Methods

Events can be passed in with the options, with a key events and object where the key is the event name and the value is the callback function.

```js
options: {
  placeholder: "Edit Me",
  events : {
    'froalaEditor.focus' : function(e, editor) {
      console.log(editor.selection.get());
    }
  }
}
```

Using the editor instance from the arguments of the callback you can call editor methods as described in the [method docs](http://froala.com/wysiwyg-editor/docs/methods).

Froala events are described in the [events docs](https://froala.com/wysiwyg-editor/docs/events).

### Model

The WYSIWYG HTML editor content model.

`model={this.state.model}`

Two way binding:

```js
getInitialState: function() {
  return {model: 'Example text'};
},

handleModelChange: function(model) {
  this.setState({model: model});
},

// ...

<FroalaEditor
  model={this.state.model}
  onModelChange={this.handleModelChange}
/>
```

To achieve one way binding and pass only the initial editor content, simply do not pass `onModelChange` attribute.

Use the content in other places:

```js
<input value={this.state.model}/>
```

### Special tags
You can also use the editor on **img**, **button**, **input** and **a** tags:

```js
<FroalaEditorImg
  config={this.config}
/>
<FroalaEditorButton
  config={this.config}
/>
<FroalaEditorInput
  config={this.config}
/>
<FroalaEditorA
  config={this.config}
/>
```

The model must be an object containing the attributes for your special tags. Example:

```js
getInitialState: function() {
  return {model: {src: 'path/to/image.jpg'}};
},
```

The model will change as the attributes change during usage if you use two way binding and pass `onModelChange` function.

* The model can contain a special attribute named **innerHTML** which inserts innerHTML in the element: If you are using 'button' tag, you can specify the button text like this:

```js
getInitialState: function() {
  return {content: {innerHTML: 'Click Me'}};
},
```
As the button text is modified by the editor, the **innerHTML** attribute from buttonModel model will be modified too.

#### Specific option for special tags

 * **reactIgnoreAttrs**: (default: null) This option is an array of attributes that you want to ignore when the editor updates the froalaModel:

 ```js
config: {
  reactIgnoreAttrs: ['class', 'id']
},
 ```

### Manual Instantiation

Gets the functionality to operate on the editor: create, destroy and get editor instance. Use it if you want to manually initialize the editor.

`onManualControllerReady={this.handleManualController}`

```js
handleManualController: function(initControls) {
  //...
}
```

The object received by the function will contain the following methods:

- **initialize**: Call this method to initialize the Froala Editor
- **destroy**: Call this method to destroy the Froala Editor
- **getEditor**: Call this method to retrieve the editor that was created. This method will return *null* if the editor was not yet created


### Displaying HTML

To display content created with the froala editor use the `FroalaEditorView` component.

```js
<FroalaEditor
  model={this.state.content}
  onModelChange={this.handleModelChange}
/>
<FroalaEditorView
  model={this.state.content}
/>
```

## License

The `react-froala-wyswiyg` project is under MIT license. However, in order to use Froala WYSIWYG HTML Editor plugin you should purchase a license for it.

Froala Editor has [3 different licenses](http://froala.com/wysiwyg-editor/pricing) for commercial use.
For details please see [License Agreement](http://froala.com/wysiwyg-editor/terms).

## Development environment setup

If you want to contribute to react-froala-wyswiyg, you will first need to install the required tools to get the project going.

#### Prerequisites

* [Node Package Manager](https://npmjs.org/) (NPM)
* [Git](http://git-scm.com/)

#### Install dependencies

    $ npm install

#### Build

    $ npm run build

#### Run Demo

    $ npm run demo

