declare module 'react-froala-wysiwyg'
{
  import * as React from 'react';
  import FroalaEditor, { FroalaOptions } from 'froala-editor';

  /** Options the React wrapper reads itself. They are passed on to the editor too. */
  export interface ReactFroalaOptions {
    /** Call onModelChange on every keyup as well as on contentChanged. Default: false. */
    immediateReactModelUpdate?: boolean;
    /** Special tags only: attributes to leave out of the model. Default: null. */
    reactIgnoreAttrs?: string[] | null;
  }

  export type FroalaEditorConfig = Partial<FroalaOptions> & ReactFroalaOptions;

  /** What onManualControllerReady receives. */
  export interface ManualController {
    initialize(): void;
    destroy(): void;
    getEditor(): FroalaEditor | null;
  }

  interface FroalaEditorBaseProps {
    config?: FroalaEditorConfig;
    /** Take over creation: the editor is created only when the controller's initialize() is called. */
    onManualControllerReady?: (controller: ManualController) => void;
    /** Keep the undo history when model is changed from outside the editor. Default: false. */
    skipReset?: boolean;
  }

  export interface FroalaEditorProps extends FroalaEditorBaseProps {
    /** Element the editor is created on. Default: 'div'. */
    tag?: string;
    model?: string | null;
    onModelChange?: (model: string) => void;
    children?: React.ReactNode;
  }

  /** img, a, button and input: the model is a map of attributes, plus innerHTML. */
  export type FroalaSpecialTagModel = Record<string, string>;

  export interface FroalaSpecialTagProps extends FroalaEditorBaseProps {
    model?: FroalaSpecialTagModel | null;
    onModelChange?: (model: FroalaSpecialTagModel) => void;
  }

  export interface FroalaEditorViewProps {
    model?: string | null;
    tag?: string;
  }

  /** @deprecated Use FroalaEditorProps. */
  export interface MyComponentProps extends FroalaEditorProps {}

  export default class FroalaEditorComponent extends React.Component<FroalaEditorProps> {
    /** The editor instance, or null before it is created and after destroy(). */
    getEditor(): FroalaEditor | null;
    /** Create the editor. Does nothing while one exists. */
    initialize(): void;
    /** Destroy the editor. */
    destroy(): void;
  }
}

declare module 'react-froala-wysiwyg/FroalaEditorView'
{
  import * as React from 'react';
  import { FroalaEditorViewProps } from 'react-froala-wysiwyg';

  /** @deprecated Use FroalaEditorViewProps. */
  export interface MyComponentProps extends FroalaEditorViewProps {}

  export default class FroalaEditorView extends React.Component<FroalaEditorViewProps> {}
}

declare module 'react-froala-wysiwyg/FroalaEditorImg'
{
  import * as React from 'react';
  import FroalaEditor from 'froala-editor';
  import { FroalaSpecialTagProps } from 'react-froala-wysiwyg';

  /** @deprecated Use FroalaSpecialTagProps. */
  export interface MyComponentProps extends FroalaSpecialTagProps {}

  export default class FroalaEditorImg extends React.Component<FroalaSpecialTagProps> {
    getEditor(): FroalaEditor | null;
    initialize(): void;
    destroy(): void;
  }
}

declare module 'react-froala-wysiwyg/FroalaEditorA'
{
  import * as React from 'react';
  import FroalaEditor from 'froala-editor';
  import { FroalaSpecialTagProps } from 'react-froala-wysiwyg';

  /** @deprecated Use FroalaSpecialTagProps. */
  export interface MyComponentProps extends FroalaSpecialTagProps {}

  export default class FroalaEditorA extends React.Component<FroalaSpecialTagProps> {
    getEditor(): FroalaEditor | null;
    initialize(): void;
    destroy(): void;
  }
}

declare module 'react-froala-wysiwyg/FroalaEditorButton'
{
  import * as React from 'react';
  import FroalaEditor from 'froala-editor';
  import { FroalaSpecialTagProps } from 'react-froala-wysiwyg';

  /** @deprecated Use FroalaSpecialTagProps. */
  export interface MyComponentProps extends FroalaSpecialTagProps {}

  export default class FroalaEditorButton extends React.Component<FroalaSpecialTagProps> {
    getEditor(): FroalaEditor | null;
    initialize(): void;
    destroy(): void;
  }
}

declare module 'react-froala-wysiwyg/FroalaEditorInput'
{
  import * as React from 'react';
  import FroalaEditor from 'froala-editor';
  import { FroalaSpecialTagProps } from 'react-froala-wysiwyg';

  /** @deprecated Use FroalaSpecialTagProps. */
  export interface MyComponentProps extends FroalaSpecialTagProps {}

  export default class FroalaEditorInput extends React.Component<FroalaSpecialTagProps> {
    getEditor(): FroalaEditor | null;
    initialize(): void;
    destroy(): void;
  }
}
