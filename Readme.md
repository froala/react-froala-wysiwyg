# React JS Froala WYSIWYG Editor

[![npm](https://img.shields.io/npm/v/react-froala-wysiwyg.svg)](https://www.npmjs.com/package/react-froala-wysiwyg)
[![npm](https://img.shields.io/npm/dm/react-froala-wysiwyg.svg)](https://www.npmjs.com/package/react-froala-wysiwyg)
[![npm](https://img.shields.io/npm/l/react-froala-wysiwyg.svg)](https://www.npmjs.com/package/react-froala-wysiwyg)

>react-froala-wysiwyg provides React bindings to the Froala WYSIWYG editor.

It supports React 0.14 through 19. The function component examples below use hooks, which need React 16.8 or later.

## Table of contents
1. [Installation](#installation)
2. [Update editor version](#update-editor-version)
3. [Usage](#usage)
4. [Config](#config)
5. [Events and Methods](#events-and-methods)
6. [Model](#model)
7. [Special tags](#special-tags)
8. [Manual Instantiation](#manual-instantiation)
9. [Displaying HTML](#displaying-html)
10. [Custom Buttons](#custom-buttons)
11. [Usage with Server-Side Rendering](#usage-with-server-side-rendering)
12. [TypeScript](#typescript)
13. [React StrictMode](#react-strictmode)
14. [License](#license)
15. [Development environment setup](#development-environment-setup)

## Installation

Install the wrapper and `froala-editor` together, with `froala-editor` at the exact version the wrapper depends on:

```bash
npm install --save-exact react-froala-wysiwyg froala-editor@$(npm view react-froala-wysiwyg dependencies.froala-editor)
```

This works in bash, zsh and PowerShell. In Windows `cmd`, run `npm view react-froala-wysiwyg dependencies.froala-editor` first, then `npm install --save-exact react-froala-wysiwyg froala-editor@` followed by the version it printed. `--save-exact` keeps `froala-editor` at that version in `package.json`, so a later install can't pull in a newer patch next to the wrapper's copy.

The samples below import `froala-editor` directly (its CSS, plugins and the `FroalaEditor` class), so it has to be a direct dependency. npm happens to hoist the wrapper's copy, but pnpm and Yarn PnP don't, and the build fails to resolve `froala-editor/css/...`.

Don't install a different `froala-editor` version. With two copies, plugins and custom buttons register on your copy while the wrapper creates the editor from its own, so they silently don't show up.

## Update editor version

`react-froala-wysiwyg` pins the exact `froala-editor` version it was built and tested against, so update the wrapper to get a newer editor, and move `froala-editor` to the version the new wrapper depends on:

```bash
npm install --save-exact react-froala-wysiwyg@latest froala-editor@$(npm view react-froala-wysiwyg@latest dependencies.froala-editor)
```

In Windows `cmd`, run the `npm view` part on its own and paste the version, as above.

## Usage

#### 1. Import and use the Froala Editor component inside your application.

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';

// Import all Froala Editor plugins;
// import 'froala-editor/js/plugins.pkgd.min.js';

// Import a single Froala Editor plugin.
// import 'froala-editor/js/plugins/align.min.js';

// Import a language file.
// import 'froala-editor/js/languages/de.js';

// Import a third-party plugin.
// import 'froala-editor/js/third_party/image_tui.min.js';
// import 'froala-editor/js/third_party/embedly.min.js';
// import 'froala-editor/js/third_party/spell_checker.min.js';

// Include font-awesome css if required.
// install using "npm install font-awesome"
// import 'font-awesome/css/font-awesome.css';
// import 'froala-editor/js/third_party/font_awesome.min.js';

// Include special components if required.
// import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
// import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
// import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
// import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
// import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';

// Render Froala Editor component.
const root = ReactDOM.createRoot(document.getElementById('editor'));
root.render(<FroalaEditorComponent tag='textarea'/>);
```

`react-dom/client` and `createRoot` need React 18 or later. On React 17 and earlier, use `import ReactDOM from 'react-dom'` and `ReactDOM.render(<FroalaEditorComponent tag='textarea'/>, document.getElementById('editor'))` instead.

#### 2. Add an element with that id to your HTML.

```html
<div id="editor"></div>
```

In an app created with a tool like Vite, render `<FroalaEditorComponent/>` inside one of your components instead. The examples below assume `FroalaEditorComponent` and the special components are imported as shown above.

#### Component props

```jsx
<FroalaEditorComponent
  tag='textarea'
  config={config}
  model={model}
  onModelChange={handleModelChange}
/>
```

- **tag**: the element the editor is initialized on (default: `div`).
- **config**: [editor options](#config).
- **model**: the editor content. See [Model](#model).
- **onModelChange**: called with the new content when it changes. See [Model](#model) for when it fires.
- **onManualControllerReady**: see [Manual Instantiation](#manual-instantiation).
- **skipReset**: when `true`, setting a new `model` from outside the editor keeps the editor's undo history instead of resetting it. See [Undo history and `skipReset`](#undo-history-and-skipreset).

There are special tags: **a**, **button**, **img**, **input**. Do not use them in `FroalaEditorComponent`. To initialize the editor on a special tag, use `FroalaEditorA`, `FroalaEditorButton`, `FroalaEditorImg` and `FroalaEditorInput` components.

## Config

You can pass editor options as component attribute (optional).

`config={config}`

You can pass any existing Froala option. Consult the [Froala documentation](https://froala.com/wysiwyg-editor/docs/options/) to view the list of all the available options:

```jsx
config={{
  placeholderText: 'Edit Your Content Here!',
  charCounterCount: false
}}
```

Additional option is used:
* **immediateReactModelUpdate**: (default: false) This option updates the React model as soon as a key is released in the editor. Note that it may affect performance.

### Changing config after mount

`config` is read once, when the editor is created. If you change it later (a new `placeholderText`, a different `language`, a toolbar that depends on state), the editor that's already running won't pick it up. To apply new options, re-mount the component by giving it a `key` that changes along with them:

```jsx
// Import the language file for each locale you switch to.
<FroalaEditorComponent
  key={locale}
  tag='textarea'
  config={{ language: locale }}
  model={model}
  onModelChange={setModel}
/>
```

When `key` changes, React destroys the old editor and creates a new one with the current `config`. The content comes back from `model`, so keep it in state as above. Undo history starts fresh with the new editor.

## Events and Methods

Events can be passed in with the options, with a key events and object where the key is the event name and the value is the callback function. Inside the callback, `this` is the editor instance, so use a regular `function` rather than an arrow function:

```jsx
config={{
  placeholderText: 'Edit Me',
  events : {
    'focus' : function() {
      console.log(this.selection.get());
    }
  }
}}
```

Using the editor instance you can call editor methods as described in the [method docs](https://froala.com/wysiwyg-editor/docs/methods/).

Froala events are described in the [events docs](https://froala.com/wysiwyg-editor/docs/events/).

## Model

The WYSIWYG HTML editor content model.

`model={model}`

Two way binding:

```jsx
import React, { useState } from 'react';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

const App = () => {
  const [model, setModel] = useState('Example Set');

  return (
    <div className="App">
      <FroalaEditorComponent
        tag='textarea'
        model={model}
        onModelChange={setModel}
      />
      <FroalaEditorView
        model={model}
      />
    </div>
  );
}
```

The same with a class component:

```jsx
import React from 'react';
import FroalaEditorComponent from 'react-froala-wysiwyg';

class EditorComponent extends React.Component {
  constructor () {
    super();

    this.handleModelChange = this.handleModelChange.bind(this);

    this.state = {
      model: 'Example text'
    };
  }

  handleModelChange (model) {
    this.setState({
      model: model
    });
  }

  render () {
    return <FroalaEditorComponent
      model={this.state.model}
      onModelChange={this.handleModelChange}
    />
  }
}
```

`onModelChange` is called on the editor's `contentChanged` event, and on every `keyup` too when `immediateReactModelUpdate` is set. For the editor's HTML, it's only called when the content differs from the last value the component passed in or out, so loading `model` on mount doesn't call it when it's already the editor's HTML.

To achieve one way binding and pass only the initial editor content, simply do not pass `onModelChange` attribute.

Use the content in other places:

```jsx
<input value={model} readOnly/>
```

### Undo history and `skipReset`

When the parent passes in a `model` the editor didn't produce itself (loading a different document, say), the component sets it in the editor and clears the undo history, so Undo can't step back into the previous content. Passing the editor's own value back in from `onModelChange`, as two-way binding does, isn't affected: the component recognises the value it just emitted and leaves the editor and its history alone.

To keep the history across external changes, pass `skipReset`:

```jsx
<FroalaEditorComponent
  tag='textarea'
  model={model}
  onModelChange={setModel}
  skipReset={true}
/>
```

With `skipReset`, the external change becomes one more undo step, so Undo takes the editor back to what it held before.

## Special tags

You can also use the editor on **img**, **button**, **input** and **a** tags.

These need the editor's plugins: `image` for `FroalaEditorImg` and `link` for `FroalaEditorA`. Without them the element renders, but clicking it does nothing. Import the plugins, as in the commented-out line in [Usage](#usage):

```jsx
import 'froala-editor/js/plugins.pkgd.min.js';
```

```jsx
<FroalaEditorImg
  model={imgModel}
  onModelChange={setImgModel}
/>
<FroalaEditorButton
  model={buttonModel}
  onModelChange={setButtonModel}
/>
<FroalaEditorInput
  model={inputModel}
  onModelChange={setInputModel}
/>
<FroalaEditorA
  model={linkModel}
  onModelChange={setLinkModel}
/>
```

The model must be an object containing the attributes for your special tags. Example:

```jsx
const [imgModel, setImgModel] = useState({
  src: 'path/to/image.jpg',
  width: '300px',
  alt: 'Old Clock'
});
```

* The model can contain a special attribute named **innerHTML** which inserts innerHTML in the element: If you are using 'button' tag, you can specify the button text like this:

```jsx
const [buttonModel, setButtonModel] = useState({innerHTML: 'Click Me'});
```

As the button text is modified by the editor, the **innerHTML** attribute of the button's model will be modified too.

#### Specific option for special tags

* **reactIgnoreAttrs**: (default: null) This option is an array of attributes that you want to ignore when the editor updates the model:

```jsx
config={{
  reactIgnoreAttrs: ['class', 'id']
}}
```

## Manual Instantiation

Gets the functionality to operate on the editor: create, destroy and get editor instance. Use it if you want to manually initialize the editor.

When `onManualControllerReady` is set, the editor doesn't start on mount. It starts when you call `initialize()`:

```jsx
import { useState } from 'react';
import FroalaEditorComponent from 'react-froala-wysiwyg';

function ManualEditor() {
  const [initControls, setInitControls] = useState(null);

  const handleManualController = (controls) => {
    setInitControls(controls);
  };

  const initializeEditor = () => {
    initControls.initialize();
  };

  const deleteAll = () => {
    const editor = initControls && initControls.getEditor();
    if (editor && editor.html) {
      editor.html.set('');
    }
  };

  return (
    <>
      <button onClick={initializeEditor} disabled={!initControls}>Initialize</button>
      <button onClick={deleteAll}>Delete All</button>
      <FroalaEditorComponent onManualControllerReady={handleManualController} />
    </>
  );
}
```

`getEditor()` returns `null` until `initialize()` has run, and the editor isn't ready the moment `initialize()` returns either, so don't call its methods on the next line. Guard them as `deleteAll` does, or use them from the `initialized` event.

The object received by the function will contain the following methods:

- **initialize**: Call this method to initialize the Froala Editor
- **destroy**: Call this method to destroy the Froala Editor
- **getEditor**: Call this method to retrieve the editor that was created. This method will return *null* if the editor was not yet created

### Using a ref

The same three methods are on the component itself, so a ref reaches the editor too. With a ref the editor still starts on mount, unless `onManualControllerReady` is also set:

```jsx
import { useRef } from 'react';
import FroalaEditorComponent from 'react-froala-wysiwyg';

function EditorWithRef() {
  const editorRef = useRef(null);

  const deleteAll = () => {
    const editor = editorRef.current && editorRef.current.getEditor();
    if (editor && editor.html) {
      editor.html.set('');
    }
  };

  return (
    <>
      <button onClick={deleteAll}>Delete All</button>
      <FroalaEditorComponent ref={editorRef} />
    </>
  );
}
```

In TypeScript, type it as `useRef<FroalaEditorComponent>(null)`.

## Displaying HTML

To display content created with the froala editor use the `FroalaEditorView` component.

```jsx
<FroalaEditorComponent
  model={content}
  onModelChange={setContent}
/>
<FroalaEditorView
  model={content}
/>
```

`FroalaEditorView` renders `model` as raw HTML and does not sanitize it. Only pass content you trust, and sanitize HTML loaded from storage or from other users first (on the server, or with a library such as DOMPurify).

## Custom Buttons

You can pass the custom buttons to the editor by following way:

```jsx
import FroalaEditor from 'froala-editor';

FroalaEditor.DefineIcon('alert', {NAME: 'info', SVG_KEY: 'help'});
FroalaEditor.RegisterCommand('alert', {
  title: 'Hello',
  focus: false,
  undo: false,
  refreshAfterCallback: false,
  callback: function () {
    alert('Hello!');
  }
});

FroalaEditor.DefineIcon('clear', {NAME: 'remove', SVG_KEY: 'remove'});
FroalaEditor.RegisterCommand('clear', {
  title: 'Clear HTML',
  focus: false,
  undo: true,
  refreshAfterCallback: true,
  callback: function () {
    this.html.set('');
    this.events.focus();
  }
});

FroalaEditor.DefineIcon('insert', {NAME: 'plus', SVG_KEY: 'add'});
FroalaEditor.RegisterCommand('insert', {
  title: 'Insert HTML',
  focus: true,
  undo: true,
  refreshAfterCallback: true,
  callback: function () {
    this.html.insert('My New HTML');
  }
});
```

Now you can use these buttons in options:

```jsx
<FroalaEditorComponent
  config={{
    toolbarButtons: [['undo', 'redo', 'bold'], ['alert', 'clear', 'insert']]
  }}
/>
```

## Usage with Server-Side Rendering

The editor needs a browser, so on the server render nothing and load the editor in the browser. Importing `react-froala-wysiwyg` during server rendering fails, even from a `'use client'` file.

### Next.js

Put the editor in its own client component:

```jsx
// app/editor/FroalaClient.jsx
'use client';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { useState } from 'react';

export default function FroalaClient() {
  const [model, setModel] = useState('<p>Hello</p>');
  return (
    <FroalaEditorComponent
      tag='textarea'
      model={model}
      onModelChange={setModel}
      config={{ placeholderText: 'Start writing…' }}
    />
  );
}
```

Then load it with `next/dynamic` and `ssr: false`, from another client component:

```jsx
// app/editor/Editor.jsx
'use client';
import dynamic from 'next/dynamic';

const FroalaClient = dynamic(() => import('./FroalaClient'), {
  ssr: false,
  loading: () => <p>Loading editor…</p>,
});

export default function Editor() {
  return <FroalaClient />;
}
```

And render `Editor` from the page:

```jsx
// app/editor/page.jsx
import Editor from './Editor';

export default function Page() {
  return <Editor />;
}
```

Pages and other server components should import `Editor`, never `FroalaClient`. Importing `FroalaClient` directly brings back the server-rendering failure.

Register custom buttons, icons and languages inside `FroalaClient.jsx` too, so they only run in the browser.

### Other SSR frameworks

Use React lazy loading. It also lets plugins and translations load before the editor is created, so the editor picks them up. If your framework uses React Server Components, start the file with `'use client'`.

#### Functional component

```jsx
import React, { Suspense, useEffect, useState } from 'react';

import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';

const FroalaEditor = React.lazy(() => import('react-froala-wysiwyg'));

export default function MyComponent() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [content, setContent] = useState('Hello, Froala!');

  useEffect(() => {
    async function initPlugins() {
      // Import all Froala Editor plugins;
      await import('froala-editor/js/plugins.pkgd.min.js');
      setIsInitialized(true);
    }
    initPlugins();
  }, []);

  return <>
    {isInitialized && (
      <Suspense fallback={<p>Loading...</p>}>
        <FroalaEditor
          model={content}
          onModelChange={setContent}
        />
      </Suspense>
    )}
  </>;
}
```

#### Class component

```jsx
import React, { Suspense } from 'react';

import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';

const FroalaEditor = React.lazy(() => import('react-froala-wysiwyg'));

export default class MyComponent extends React.Component {
  constructor () {
    super();
    this.state = {
      isInitialized: false,
      content: 'Hello, Froala!'
    };
  }

  componentDidMount() {
    // Import all Froala Editor plugins;
    import('froala-editor/js/plugins.pkgd.min.js').then(() => this.setState({isInitialized: true}));
  }

  render() {
    return <>
      {this.state.isInitialized && (
        <Suspense fallback={<p>Loading...</p>}>
          <FroalaEditor
            model={this.state.content}
            onModelChange={(content) => this.setState({content})}
          />
        </Suspense>
      )}
    </>;
  }
}
```

## TypeScript

The package ships its own type definitions (`lib/index.d.ts`) for `react-froala-wysiwyg` and each `react-froala-wysiwyg/FroalaEditor*` component, so in most projects TypeScript picks them up without any extra setup.

The `react-froala-wysiwyg/FroalaEditor*` types are declared in that same file, so they only load once something imports `react-froala-wysiwyg` itself. If your project imports only a subpath, such as a read-only page that uses just `FroalaEditorView`, add this line to a `.d.ts` file in your project (for example `src/froala.d.ts`):

```ts
/// <reference types="react-froala-wysiwyg" />
```

The props are typed: `config` takes the editor's options plus the wrapper's own (`immediateReactModelUpdate`, `reactIgnoreAttrs`), `onModelChange` receives a `string` (an attribute map for the special tags), and `getEditor()` returns the editor instance, or `null` before it's created. The package also exports the types it uses, such as `FroalaEditorConfig`, `FroalaEditorProps` and `ManualController`:

```tsx
import type { FroalaEditorConfig } from 'react-froala-wysiwyg';

const config: FroalaEditorConfig = { placeholderText: 'Edit Me', immediateReactModelUpdate: true };
```

`froala-editor` has types for the options and the editor instance. In strict mode, type `this` in event callbacks:

```tsx
import FroalaEditor from 'froala-editor';
import type { FroalaOptions } from 'froala-editor';

const config: Partial<FroalaOptions> = {
  placeholderText: 'Edit Me',
  events: {
    focus: function (this: FroalaEditor) {
      console.log(this.selection.get());
    }
  }
};
```

## React StrictMode

In development, StrictMode mounts every component twice, so the editor is created, destroyed and created again. Handlers such as `initialized` run once for each editor that's created, so twice in development. Production builds mount once.

## License

The `react-froala-wysiwyg` project is under MIT license. However, in order to use Froala WYSIWYG HTML Editor plugin you should purchase a license for it.

Froala Editor has [3 different licenses](https://froala.com/wysiwyg-editor/pricing/) for commercial use.
For details please see [License Agreement](https://froala.com/wysiwyg-editor/terms/).

## Development environment setup

If you want to contribute to react-froala-wysiwyg, you will first need to install the required tools to get the project going.

#### Prerequisites

* [Node Package Manager](https://www.npmjs.com/) (NPM)
* [Git](https://git-scm.com/)

#### Install dependencies

    $ npm install

#### Build

    $ npm run build

#### Run Demo

    $ npm run demo

The demo is served at http://localhost:4000. It uses the built files, so run `npm run build` first.
