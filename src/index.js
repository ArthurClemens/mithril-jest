import htmltidy from "tidy-html5";
import m from "mithril";

const defaultHtmlTidyOptions = {
  "show-body-only": true,
  "drop-empty-elements": false,
  "doctype": "omit",
  "indent": true,
  "quiet": true, // Hides "About this fork of Tidy ..."
  "show-warnings": false // Hides "line 1 column 1 - Warning: missing <!DOCTYPE> declaration ...""
};

export const tidy = (vnodes, htmltidyOptions = defaultHtmlTidyOptions) => {
  const htmlElement = document.createElement("div");
  m.render(htmlElement, vnodes);
  const html = htmlElement.innerHTML;
  return htmltidy.tidy_html5(html, htmltidyOptions);
};
