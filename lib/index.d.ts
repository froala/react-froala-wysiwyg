import React from 'react';

export interface MyComponentProps {
   tag?:string;
   config?: object;
   model?: string| object|null;
   onModelChange?: function;
   onManualControllerReady?: function;
}


declare class  FroalaEditor extends React.Component<MyComponentProps>{
   destroy():void;
   getEditor(): any;
   initialize() : object;
}
export default FroalaEditor;

declare class  FroalaEditorInput extends React.Component<MyComponentProps>
{

}
export default FroalaEditorInput;

declare class  FroalaEditorView extends React.Component<MyComponentProps>
{

}
export default FroalaEditorView;

declare class  FroalaEditorButton extends React.Component<MyComponentProps>
{

}
export default FroalaEditorButton;

declare class  FroalaEditorImg extends React.Component<MyComponentProps>
{

}
export default FroalaEditorImg;
declare class  FroalaEditorInput extends React.Component<MyComponentProps>
{

}
export default FroalaEditorInput;

declare class  FroalaEditorA extends React.Component<MyComponentProps>
{

}
export default FroalaEditorA;