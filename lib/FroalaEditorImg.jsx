"use client";

import React from "react";
import useFroalaEditorFunctionality from "./useFroalaEditorFunctionality";

const FroalaEditorImg = (props) => {
  const { elementRef } = useFroalaEditorFunctionality(props);

  return <img ref={elementRef} />;
};

export default FroalaEditorImg;
