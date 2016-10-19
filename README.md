# React JS Froala WYSIWYG Editor

>react-froala-wyswiyg provides React bindings to the Froala WYSIWYG editor VERSION 2.

## Installation

1. Clone this repo or download the zip.

2. Run `bower install` or Download the editor from [https://www.froala.com/wysiwyg-editor/](https://www.froala.com/wysiwyg-editor/) and jQuery

3. Load Froala WYSIWYG editor (and all desired plugins), jQuery, React framework and react-froala-wyswiyg component files into your project:

  - **lib/froalaEditorFunctionality.js** : Mixin: must be included **before** `FroalaEditor` components:
    - **lib/froalaEditor.js**            : `FroalaEditor` component
    - **lib/froalaEditorA.js**           : `FroalaEditorA` component: init on 'a' tag
    - **lib/froalaEditorButton.js**      : `FroalaEditorButton` component: init on 'button' tag
    - **lib/froalaEditorImg.js**         : `FroalaEditorImg` component: init on 'img' tag
    - **lib/froalaEditorInput.js**       : `FroalaEditorInput` component: init on 'input' tag

  - **lib/froalaView.js**                : `FroalaView` component for displaing the editor HTML; can be used standalone without the mixin.

 ***NB***: You must ensure jQuery is included *before* React.

## Usage

1.&nbsp;Import froala components into your html file:

```html
<script type="text/babel" src="path/to/lib/froalaEditorFunctionality.js"></script>
<script type="text/babel" src="path/to/lib/froalaEditor.js"></script>
<script type="text/babel" src="path/to/lib/froalaEditorButton.js"></script>
<script type="text/babel" src="path/to/lib/froalaEditorInput.js"></script>
<script type="text/babel" src="path/to/lib/froalaEditorA.js"></script>
<script type="text/babel" src="path/to/lib/froalaEditorImg.js"></script>

<script type="text/babel" src="path/to/lib/froalaView.js"></script>
```

2.&nbsp;Use them in your component:

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

 ***NB***: The code is written in React JSX. You must load **babel-standalone** in your HTML **before** lib files. Or you can compile them to plain javascript.

You can check **src/** dir for a more detailed usage example.

* 'src' directory contains a working example that will need a server to run. To run them: `npm start`.

* 'demo' directory contains a minified working example that can run without a server. To build demo/app.js in case you've modified the sources(src dir): `npm run build`. To run: open demo/index.html directly into browser.

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

To display content created with the froala editor use the `FroalaView` component.

```js
<FroalaEditor
  model={this.state.content}
  onModelChange={this.handleModelChange}
/>
<FroalaView
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

#### Dependencies

* [Bower](http://bower.io/) (package management)

##### 1. Install Bower

    $ npm install -g grunt-cli bower

##### 2. Install project dependencies

    $ npm install
    $ bower install

##### 3. Run in development mode. Is loads the src files that make use of lib/ components
    $ npm start
