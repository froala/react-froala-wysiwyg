import React from 'react';
interface configuration
{
    immediateReactModelUpdate: boolean;
    reactIgnoreAttrs: any;

}
export class FroalaEditorFunctionality extends React.Component{
    constructor(props : object);
    tag: string;
    defaultTag: string;
    listeningEvents: string[];
    $element: object;
    $editor: object;
    config: configuration;
    editorInitialized: boolean;
    SPECIAL_TAGS: string[];
    INNER_HTML_ATTR: string;
    hasSpecialTag: boolean;
    oldmodel: any;
    createEditor():void;
    setContent(flag: boolean):void;
    setNormalTagContent(flag: boolean):void;
    setSpecialTagContent():void;
    destroyEditor():void;
    getEditor(): object;
    generateManualController():void;
    updateModel(): void;
    initListeners():void;
    registerEvent (element:object, eventName:string, callback:Function):void;
    registerEvents():void;
}
export  class FroalaEditorView extends React.Component{
    defaultTag: string;
    getTrustedHtml(): object;
}
export  class FroalaEditorA extends FroalaEditorFunctionality{

}
export  class FroalaEditorButton extends FroalaEditorFunctionality{

}
export  class FroalaEditorImg extends FroalaEditorFunctionality{

}
export  class FroalaEditorInput extends FroalaEditorFunctionality{

}