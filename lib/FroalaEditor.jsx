"use client";

import React from "react";
import useFroalaEditorFunctionality from "./useFroalaEditorFunctionality";

const FroalaEditor = (props) => {
  const { elementRef, tag } = useFroalaEditorFunctionality(props);

  const TagName = tag;

  return <TagName ref={elementRef}>{props.children}</TagName>;
};

export default FroalaEditor;
