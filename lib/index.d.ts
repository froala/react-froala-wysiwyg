import {
  MoreMiscButton,
  MoreParagraphButton,
  MoreRichButton,
  MoreTextButton,
  MoreTrackChangeButton,
} from "./buttons";
import { Plugin } from "./plugins";

interface FroalaConfig {
  toolbarButtons?:
    | {
        moreText?: {
          buttons: MoreTextButton[];
        };
        moreParagraph?: {
          buttons: MoreParagraphButton[];
        };
        moreRich?: {
          buttons: MoreRichButton[];
        };
        moreMisc?: {
          buttons: MoreMiscButton[];
        };
        moreTrackChanges?: {
          buttons: MoreTrackChangeButton[];
        };
      }
    | string[];
  pluginsEnabled?: Plugin[];
  htmlAllowedTags?: string[];
  pasteDeniedAttrs?: string[];
  pasteAllowedStyleProps?: string[];
  htmlAllowedStyleProps?: string[];
  htmlAllowComments?: boolean;
  trackChangesEnabled?: boolean;
  showChangesEnabled?: boolean;
  paragraphFormat?: { [key: string]: string };
}

declare module "react-froala-wysiwyg" {
  export interface MyComponentProps {
    tag?: string;
    config?: FroalaConfig;
    model?: string | object | null;
    onModelChange?: object;
    onManualControllerReady?: object;
    skipReset?: boolean | false;
  }

  export default class FroalaEditor extends React.Component<MyComponentProps> {
    destroy(): void;
    getEditor(): any;
    initialize(): object;
  }
}

declare module "react-froala-wysiwyg/FroalaEditorView" {
  export interface MyComponentProps {
    tag?: string;
    config?: FroalaConfig;
    model?: string | object | null;
    onModelChange?: object;
    onManualControllerReady?: object;
    skipReset?: boolean | false;
  }
  export default class FroalaEditorView extends React.Component<MyComponentProps> {}
}

declare module "react-froala-wysiwyg/FroalaEditorImg" {
  export interface MyComponentProps {
    tag?: string;
    config?: FroalaConfig;
    model?: string | object | null;
    onModelChange?: object;
    onManualControllerReady?: object;
    skipReset?: boolean | false;
  }
  export default class FroalaEditorImg extends React.Component<MyComponentProps> {}
}

declare module "react-froala-wysiwyg/FroalaEditorA" {
  export interface MyComponentProps {
    tag?: string;
    config?: FroalaConfig;
    model?: string | object | null;
    onModelChange?: object;
    onManualControllerReady?: object;
    skipReset?: boolean | false;
  }
  export default class FroalaEditorA extends React.Component<MyComponentProps> {}
}

declare module "react-froala-wysiwyg/FroalaEditorButton" {
  export interface MyComponentProps {
    tag?: string;
    config?: FroalaConfig;
    model?: string | object | null;
    onModelChange?: object;
    onManualControllerReady?: object;
    skipReset?: boolean | false;
  }
  export default class FroalaEditorButton extends React.Component<MyComponentProps> {}
}

declare module "react-froala-wysiwyg/FroalaEditorInput" {
  export interface MyComponentProps {
    tag?: string;
    config?: FroalaConfig;
    model?: string | object | null;
    onModelChange?: object;
    onManualControllerReady?: object;
    skipReset?: boolean | false;
  }
  export default class FroalaEditorInput extends React.Component<MyComponentProps> {}
}
