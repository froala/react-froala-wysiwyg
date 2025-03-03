"use client";

import React from "react";

const FroalaEditorView = (props) => {
  const defaultTag = "div";
  const TagName = props.tag || defaultTag;

  const getTrustedHtml = () => {
    return { __html: props.model };
  };

  return (
    <TagName
      className="fr-view"
      dangerouslySetInnerHTML={getTrustedHtml()}
    ></TagName>
  );
};

export default FroalaEditorView;
