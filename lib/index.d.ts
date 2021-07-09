import * as React from 'react';

export interface FroalaEditorProps {
  tag?: string;
  config?: object;
  model?: string | object | null;
  onModelChange?: object;
  onManualControllerReady?: object;
}

export default class FroalaEditor extends React.Component<FroalaEditorProps> {
  destroy(): void;
  getEditor(): any;
  initialize(): object;
}
