/**
 * to enable a plugin you must first import it
 *
 * @example
 * for all Plugins
 * import 'froala-editor/js/plugins.pkgd.min.js';
 *
 * or single Plugin:
 * import 'froala-editor/js/plugins/align.min.js';
 */
export type Plugin =
  | "align"
  | "charCounter"
  | "codeBeautifier"
  | "codeView"
  | "colors"
  | "draggable"
  | "embedly"
  | "emoticons"
  | "entities"
  | "file"
  | "filesManager"
  | "fontAwesome"
  | "fontFamily"
  | "fontSize"
  | "fullscreen"
  | "help"
  | "image"
  | "imageManager"
  | "imageTUI"
  | "inlineClass"
  | "inlineStyle"
  | "lineBreaker"
  | "lineHeight"
  | "link"
  | "lists"
  | "markdown"
  | "paragraphFormat"
  | "paragraphStyle"
  | "print"
  | "quickInsert"
  | "quote"
  | "save"
  | "specialCharacters"
  | "spellChecker"
  | "table"
  | "track_changes"
  | "url"
  | "video"
  | "wordPaste";
