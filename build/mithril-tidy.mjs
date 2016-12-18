import htmltidy from 'tidy-html5';
import m from 'mithril';

var defaultHtmlTidyOptions = {
  "show-body-only": "true",
  "doctype": "omit",
  "indent": true,
  "quiet": true, // Hides "About this fork of Tidy ..."
  "show-warnings": false // Hides "line 1 column 1 - Warning: missing <!DOCTYPE> declaration ...""
};

var tidy = function tidy(vnodes) {
  var htmltidyOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultHtmlTidyOptions;

  var htmlElement = document.createElement("div");
  m.render(htmlElement, vnodes);
  var html = htmlElement.innerHTML;
  return htmltidy.tidy_html5(html, htmltidyOptions);
};

export { tidy };
