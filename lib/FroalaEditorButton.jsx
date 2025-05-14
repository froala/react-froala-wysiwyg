"use client";

import React from "react";
import useFroalaEditorFunctionality from "./useFroalaEditorFunctionality";

const FroalaEditorButton = (props) => {
  const { elementRef } = useFroalaEditorFunctionality(props);

  return <button ref={elementRef}>{props.children}</button>;
};

export default FroalaEditorButton;
