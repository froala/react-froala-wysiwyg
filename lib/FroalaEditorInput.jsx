"use client";

import React from "react";
import useFroalaEditorFunctionality from "./useFroalaEditorFunctionality";

const FroalaEditorInput = (props) => {
  const { elementRef } = useFroalaEditorFunctionality(props);

  return <input ref={elementRef} />;
};

export default FroalaEditorInput;
