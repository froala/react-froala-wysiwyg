"use client";

import { useState, useEffect, useRef } from "react";

const useFroalaEditorFunctionality = (props) => {
  const [editorInitialized, setEditorInitialized] = useState(false);
  const [editorCreated, setEditorCreated] = useState(false);
  const elementRef = useRef(null);
  const editorRef = useRef(null);
  const internalEditorRef = props?.ref || editorRef;
  const oldModelRef = useRef(null);
  const initEventsRef = useRef([]);
  const listeningEventsRef = useRef([]);
  const configRef = useRef({
    immediateReactModelUpdate: false,
    reactIgnoreAttrs: null,
  });

  const SPECIAL_TAGS = ["img", "button", "input", "a"];
  const INNER_HTML_ATTR = "innerHTML";
  const defaultTag = "div";
  const tag = props.tag || defaultTag;
  const [hasSpecialTag, setHasSpecialTag] = useState(false);

  const clone = (item) => {
    if (!item) return item;

    let types = [Number, String, Boolean];
    let result;

    types.forEach(function (type) {
      if (item instanceof type) {
        result = type(item);
      }
    });

    if (typeof result == "undefined") {
      if (Object.prototype.toString.call(item) === "[object Array]") {
        result = [];
        item.forEach(function (child, index) {
          result[index] = clone(child);
        });
      } else if (typeof item == "object") {
        if (item.nodeType && typeof item.cloneNode == "function") {
          result = item.cloneNode(true);
        } else if (!item.prototype) {
          if (item instanceof Date) {
            result = new Date(item);
          } else {
            result = {};
            for (let i in item) {
              result[i] = clone(item[i]);
            }
          }
        } else {
          result = item;
        }
      } else {
        result = item;
      }
    }
    return result;
  };

  const registerEvent = (eventName, callback) => {
    if (!eventName || !callback) return;

    if (eventName === "initialized") {
      initEventsRef.current.push(callback);
    } else {
      if (!configRef.current.events) {
        configRef.current.events = {};
      }
      configRef.current.events[eventName] = callback;
    }
  };

  const updateModel = () => {
    if (!props.onModelChange) return;

    let modelContent = "";
    const element = elementRef.current;

    if (hasSpecialTag) {
      let attributeNodes = element.attributes;
      let attrs = {};

      for (let i = 0; i < attributeNodes.length; i++) {
        let attrName = attributeNodes[i].name;
        if (
          configRef.current.reactIgnoreAttrs &&
          configRef.current.reactIgnoreAttrs.indexOf(attrName) !== -1
        ) {
          continue;
        }
        attrs[attrName] = attributeNodes[i].value;
      }

      if (element.innerHTML) {
        attrs[INNER_HTML_ATTR] = element.innerHTML;
      }

      modelContent = attrs;
    } else {
      let returnedHtml = internalEditorRef.current.html.get();
      if (typeof returnedHtml === "string") {
        modelContent = returnedHtml;
      }
    }

    oldModelRef.current = modelContent;
    props.onModelChange(modelContent);
  };

  const initListeners = () => {
    if (internalEditorRef.current && internalEditorRef.current.events) {
      internalEditorRef.current.events.on("contentChanged", updateModel);

      if (configRef.current.immediateReactModelUpdate) {
        internalEditorRef.current.events.on("keyup", updateModel);
      }
    }

    if (initEventsRef.current.length > 0) {
      for (let i = 0; i < initEventsRef.current.length; i++) {
        initEventsRef.current[i].call(internalEditorRef.current);
      }
    }
  };

  const setNormalTagContent = (firstTime) => {
    const htmlSet = () => {
      if (internalEditorRef.current && internalEditorRef.current.html) {
        internalEditorRef.current.html.set(props.model || "");

        if (editorInitialized && internalEditorRef.current.undo) {
          if (!props.skipReset) {
            internalEditorRef.current.undo.reset();
          }
          internalEditorRef.current.undo.saveStep();
        }
      }
    };

    if (firstTime) {
      if (configRef.current.initOnClick) {
        registerEvent("initializationDelayed", htmlSet);
        registerEvent("initialized", () => {
          setEditorInitialized(true);
        });
      } else {
        registerEvent("initialized", () => {
          setEditorInitialized(true);
          htmlSet();
        });
      }
    } else {
      htmlSet();
    }
  };

  const setSpecialTagContent = () => {
    const tags = props.model;
    const element = elementRef.current;

    if (tags && element) {
      for (let attr in tags) {
        if (tags.hasOwnProperty(attr) && attr !== INNER_HTML_ATTR) {
          element.setAttribute(attr, tags[attr]);
        }
      }

      if (tags.hasOwnProperty(INNER_HTML_ATTR)) {
        element.innerHTML = tags[INNER_HTML_ATTR];
      }
    }
  };

  const setContent = (firstTime = false) => {
    if (props.model !== undefined) {
      oldModelRef.current = props.model;

      if (hasSpecialTag) {
        setSpecialTagContent();
      } else {
        setNormalTagContent(firstTime);
      }
    }
  };

  const createEditor = async () => {
    if (editorInitialized || editorCreated || !elementRef.current) return;

    try {
      const FroalaEditorModule = await import(
        /*webpackIgnore: true*/ "froala-editor"
      );
      const FroalaEditor = FroalaEditorModule.default;

      configRef.current = clone(props.config || configRef.current);

      registerEvent(
        "initialized",
        configRef.current.events && configRef.current.events.initialized
      );

      if (!configRef.current.events) configRef.current.events = {};
      configRef.current.events.initialized = initListeners;

      setContent(true);

      internalEditorRef.current = new FroalaEditor(
        elementRef.current,
        configRef.current
      );
      setEditorCreated(true);
    } catch (error) {
      console.error("Error initializing Froala Editor:", error);
    }
  };

  const destroyEditor = () => {
    if (elementRef.current) {
      if (internalEditorRef.current && internalEditorRef.current.destroy) {
        internalEditorRef.current.destroy();
      }

      listeningEventsRef.current = [];
      setEditorInitialized(false);
      setEditorCreated(false);
      configRef.current = {
        immediateReactModelUpdate: false,
        reactIgnoreAttrs: null,
      };

      const element = elementRef.current;
      if (element) {
        const tagName = element.tagName.toLowerCase();
        if (SPECIAL_TAGS.indexOf(tagName) === -1) {
          if (
            internalEditorRef.current &&
            internalEditorRef.current.destrying &&
            !props.onManualControllerReady &&
            tag === "textarea"
          ) {
            internalEditorRef.current.$box.remove();
          }
        }
        if (tag !== "textarea" && internalEditorRef.current) {
          internalEditorRef.current.$wp = "";
        }
      }
    }
  };

  const getEditor = () => {
    if (elementRef.current) {
      return internalEditorRef.current;
    }
    return null;
  };

  const generateManualController = () => {
    const controls = {
      initialize: createEditor,
      destroy: destroyEditor,
      getEditor: getEditor,
    };

    if (props.onManualControllerReady) {
      props.onManualControllerReady(controls);
    }
  };

  useEffect(() => {
    if (JSON.stringify(oldModelRef.current) === JSON.stringify(props.model)) {
      return;
    }
    setContent();
  }, [props.model]);

  useEffect(() => {
    const initEditor = async () => {
      if (!elementRef.current) return;

      const tagName = elementRef.current.tagName.toLowerCase();
      if (SPECIAL_TAGS.indexOf(tagName) !== -1) {
        setHasSpecialTag(true);
      }

      if (props.onManualControllerReady) {
        generateManualController();
      } else {
        await createEditor();
      }
    };

    initEditor();

    return () => {
      destroyEditor();
    };
  }, []);

  return {
    elementRef,
    tag,
    createEditor,
    destroyEditor,
    getEditor,
    updateModel,
    registerEvent,
    initListeners,
    setContent,
    generateManualController,
  };
};

export default useFroalaEditorFunctionality;
