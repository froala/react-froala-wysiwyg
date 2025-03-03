"use client";

import React from "react";
import useFroalaEditorFunctionality from "./useFroalaEditorFunctionality";

const FroalaEditorA = (props) => {
  const { elementRef } = useFroalaEditorFunctionality(props);

  return <a ref={elementRef}>{props.children}</a>;
};

export default FroalaEditorA;
