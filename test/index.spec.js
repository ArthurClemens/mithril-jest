/* global describe, it, expect */
import m from "mithril";
import { tidy } from "../index";

const svgString = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z\"/></svg>";

const page = {
  view: () =>
    m("div", [
      m("h1", "Page"),
      m("div", m.trust(svgString)),
      m("a", {
        href: "/home"
      }, "Back")
    ])
};

describe("Page component", () => {
  it("should have a title", () => {
    const cmp = m(page);
    const html = tidy(cmp);
    expect(html).toMatchSnapshot();
  });
  it("title should be h1 with label 'Page'", () => {
    const cmp = m(page);
    const html = tidy(cmp);
    expect(html).toContain("Page");
  });
});

